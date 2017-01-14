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
  DEFAULT_REDIRECT_URL: '/'
});

/*
Invitation URL: The invitation URL is sent to the user via SMS immediately after the admin creates the user in the DB.
The format of the URL will be {APP URL}/{Invitation URL}?InvitationCode={InvitationCode}.
I need this full URL because I will inject the InvitationCode and send the SMS from the APIs.

ResetPassword URL: This is similar situation as Invitation URL.
The format of the URL will be {APP URL}/{ResetPassword URL}&ResetPasswordCode={ResetPasswordCode}.
The URL will be sent to the user via SMS.
The APIs will inject in the ResetPasswordCode into the URL before sending it to the use via SMS.
*/
