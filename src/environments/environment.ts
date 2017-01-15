// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false
};

export const APP_CONFIG = Object.freeze({
  API_BASE_URL: '//api.brainstorm.live/api/Hub/',
  LS_TOKEN_KEY: 'pc_token',
  AUTO_REDIRECT_TIMER: 7000,
  DEFAULT_REDIRECT_URL: '/',

  // CHANGES WILL NOT AFFECT IN APP. YOU WILL NEED TO MAKE CHANGES IN index.html:6 (base href tag).
  APP_URL: '/',

  // CHANGES WILL NOT AFFECT IN APP. YOU WILL NEED TO MAKE CHANGES IN auth.routes.ts(two string literals).
  // TEMPLATE FOR SUCH CALL WOULD BE: {APP_URL}{INVITATION_URL}/{InvitationCode} (not query params, but part of url)
  // example: app.paycal.com/registration-step-2/32fsdf9239f2-3fn2389f23-fj23848
  INVITATION_URL: 'registration-step-2',

  // CHANGES WILL NOT AFFECT IN APP. YOU WILL NEED TO MAKE CHANGES IN auth.routes.ts(two string literals).
  // TEMPLATE FOR SUCH CALL WOULD BE: {APP_URL}{RESET_PASSWORD_URL}/{ResetPasswordCode} (not query params, but part of url)
  // example: app.paycal.com/password-reset/32fsdf9239f2-3fn2389f23-fj23848
  RESET_PASSWORD_URL: 'password-reset'
});
