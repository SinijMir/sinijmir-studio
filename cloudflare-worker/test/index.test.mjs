import assert from 'node:assert/strict';
import test from 'node:test';

import worker from '../src/index.js';

const endpoint = 'https://worker.example.test/';
const origin = 'https://sinijmir.ru';
const env = {
  TELEGRAM_BOT_TOKEN: 'test-token',
  TELEGRAM_CHAT_ID: 'test-chat',
};

function request(method, body, requestOrigin = origin) {
  return new Request(endpoint, {
    method,
    headers: {
      Origin: requestOrigin,
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });
}

const validPayload = {
  name: 'Контрольный тест',
  phone: '+7 000 000-00-00',
  projectType: 'Telegram-бот',
  message: 'Проверка обработчика без реальной отправки.',
  consent: true,
  company: '',
};

test('answers CORS preflight for the production origin', async () => {
  const response = await worker.fetch(request('OPTIONS'), env);

  assert.equal(response.status, 204);
  assert.equal(response.headers.get('Access-Control-Allow-Origin'), origin);
  assert.equal(response.headers.get('Access-Control-Allow-Methods'), 'POST, OPTIONS');
});

test('rejects an origin outside the allowlist', async () => {
  const response = await worker.fetch(
    request('POST', validPayload, 'https://example.com'),
    env,
  );

  assert.equal(response.status, 403);
  assert.equal(response.headers.get('Access-Control-Allow-Origin'), null);
});

test('returns a validation error before Telegram delivery', async () => {
  const response = await worker.fetch(
    request('POST', { ...validPayload, name: 'A' }),
    env,
  );
  const result = await response.json();

  assert.equal(response.status, 400);
  assert.equal(result.ok, false);
  assert.equal(result.error, 'Укажите ваше имя');
});

test('silently accepts a honeypot submission', async () => {
  const response = await worker.fetch(
    request('POST', { ...validPayload, company: 'spam' }),
    env,
  );
  const result = await response.json();

  assert.equal(response.status, 200);
  assert.deepEqual(result, { ok: true });
});

test('returns a request id after Telegram accepts the message', async (context) => {
  context.mock.method(globalThis, 'fetch', async (_url, options) => {
    const payload = JSON.parse(options.body);

    assert.equal(payload.chat_id, env.TELEGRAM_CHAT_ID);
    assert.match(payload.text, /Контрольный тест/);

    return Response.json({ ok: true });
  });

  const response = await worker.fetch(request('POST', validPayload), env);
  const result = await response.json();

  assert.equal(response.status, 200);
  assert.equal(result.ok, true);
  assert.match(result.requestId, /^[A-F0-9]{8}$/);
  assert.equal(result.deliveryAttempt, 1);
});
