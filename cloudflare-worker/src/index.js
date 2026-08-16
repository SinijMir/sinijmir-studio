// SinijMir Studio Telegram leads worker
const ALLOWED_ORIGINS = new Set([
  'https://sinijmir.ru',
  'https://www.sinijmir.ru',
  'http://localhost:4321',
  'http://127.0.0.1:4321',
]);

const TELEGRAM_ATTEMPTS = 2;
const TELEGRAM_TIMEOUT_MS = 6000;
const MAX_BODY_LENGTH = 10000;

function corsHeaders(origin) {
  const headers = {
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Cache-Control': 'no-store',
    Vary: 'Origin',
  };

  if (ALLOWED_ORIGINS.has(origin)) {
    headers['Access-Control-Allow-Origin'] = origin;
  }

  return headers;
}

function jsonResponse(status, data, origin = '') {
  return Response.json(data, {
    status,
    headers: corsHeaders(origin),
  });
}

function clean(value, maxLength) {
  return String(value ?? '').trim().slice(0, maxLength);
}

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function wait(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

async function parseBody(request) {
  const contentLength = Number(request.headers.get('content-length') ?? 0);

  if (contentLength > MAX_BODY_LENGTH) {
    throw new Error('PAYLOAD_TOO_LARGE');
  }

  const rawBody = await request.text();

  if (rawBody.length > MAX_BODY_LENGTH) {
    throw new Error('PAYLOAD_TOO_LARGE');
  }

  return rawBody ? JSON.parse(rawBody) : {};
}

function validatePayload(payload) {
  const name = clean(payload.name, 80);
  const phone = clean(payload.phone, 30);
  const projectType = clean(
    payload.projectType ?? payload.service,
    100,
  );
  const message = clean(
    payload.message ?? payload.details,
    2000,
  );
  const consent =
    payload.consent === true ||
    payload.consent === 'true' ||
    payload.consent === 'on';

  if (name.length < 2) {
    return { error: 'Укажите ваше имя' };
  }

  if (!/^[+()\d\s-]{7,30}$/.test(phone)) {
    return { error: 'Проверьте номер телефона' };
  }

  if (message.length < 10) {
    return { error: 'Опишите задачу подробнее' };
  }

  if (!consent) {
    return {
      error: 'Необходимо согласие на обработку данных',
    };
  }

  return {
    data: {
      name,
      phone,
      projectType,
      message,
    },
  };
}

function createTelegramMessage(data, requestId) {
  const createdAt = new Intl.DateTimeFormat('ru-RU', {
    timeZone: 'Europe/Moscow',
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date());

  return [
    '🔵 <b>Новая заявка SinijMir Studio</b>',
    `🆔 <b>Номер:</b> ${requestId}`,
    '',
    `👤 <b>Имя:</b> ${escapeHtml(data.name)}`,
    `📞 <b>Телефон:</b> ${escapeHtml(data.phone)}`,
    `🧭 <b>Направление:</b> ${escapeHtml(
      data.projectType || 'Не указано',
    )}`,
    '',
    '📝 <b>Задача:</b>',
    escapeHtml(data.message),
    '',
    `🕒 ${createdAt}`,
    '🌐 sinijmir.ru',
  ].join('\n');
}

async function sendTelegram(env, text) {
  let lastError = new Error('Unknown Telegram error');

  for (let attempt = 1; attempt <= TELEGRAM_ATTEMPTS; attempt += 1) {
    const controller = new AbortController();
    const timeout = setTimeout(
      () => controller.abort(),
      TELEGRAM_TIMEOUT_MS,
    );

    try {
      const response = await fetch(
        `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_id: env.TELEGRAM_CHAT_ID,
            text,
            parse_mode: 'HTML',
            disable_web_page_preview: true,
          }),
          signal: controller.signal,
        },
      );

      const result = await response.json().catch(() => ({}));

      if (response.ok && result.ok) {
        return { ok: true, attempt };
      }

      lastError = new Error(
        result.description ?? `Telegram HTTP ${response.status}`,
      );

      if (response.status !== 429 && response.status < 500) {
        break;
      }
    } catch (error) {
      lastError = error;
    } finally {
      clearTimeout(timeout);
    }

    if (attempt < TELEGRAM_ATTEMPTS) {
      await wait(500 * attempt);
    }
  }

  return { ok: false, error: lastError };
}

async function handleRequest(request, env) {
  const origin = request.headers.get('origin') ?? '';

  if (origin && !ALLOWED_ORIGINS.has(origin)) {
    return jsonResponse(403, {
      ok: false,
      error: 'Origin is not allowed',
    });
  }

  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders(origin),
    });
  }

  if (request.method !== 'POST') {
    return jsonResponse(
      405,
      { ok: false, error: 'Method is not allowed' },
      origin,
    );
  }

  let payload;

  try {
    payload = await parseBody(request);
  } catch (error) {
    const status = error.message === 'PAYLOAD_TOO_LARGE' ? 413 : 400;

    return jsonResponse(
      status,
      { ok: false, error: 'Некорректные данные заявки' },
      origin,
    );
  }

  if (clean(payload.company, 100)) {
    return jsonResponse(200, { ok: true }, origin);
  }

  const validation = validatePayload(payload);

  if (validation.error) {
    return jsonResponse(
      400,
      { ok: false, error: validation.error },
      origin,
    );
  }

  if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) {
    return jsonResponse(
      500,
      { ok: false, error: 'Сервис заявок временно недоступен' },
      origin,
    );
  }

  const requestId = crypto.randomUUID().slice(0, 8).toUpperCase();
  const message = createTelegramMessage(validation.data, requestId);
  const delivery = await sendTelegram(env, message);

  if (!delivery.ok) {
    console.error('Telegram delivery failed', {
      requestId,
      name: delivery.error?.name ?? null,
      message: delivery.error?.message ?? null,
    });

    return jsonResponse(
      502,
      { ok: false, error: 'Заявка не отправлена. Попробуйте ещё раз.' },
      origin,
    );
  }

  return jsonResponse(
    200,
    {
      ok: true,
      message: 'Заявка успешно отправлена',
      requestId,
      deliveryAttempt: delivery.attempt,
    },
    origin,
  );
}

export default {
  fetch(request, env) {
    return handleRequest(request, env);
  },
};
