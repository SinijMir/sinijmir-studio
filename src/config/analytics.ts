export const metrikaGoals = {
  discussProject: 'discuss_project',
  telegramClick: 'telegram_click',
  phoneClick: 'phone_click',
  emailClick: 'email_click',
  requestOpen: 'request_open',
  inquirySuccess: 'inquiry_success',
} as const;

export const metrikaGoalGroups = {
  discussProject: `${metrikaGoals.discussProject} ${metrikaGoals.requestOpen}`,
} as const;

export const analyticsConfig = {
  yandexMetrika: {
    counterId: 111535461,
  },
} as const;
