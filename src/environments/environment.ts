// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

import {Employee} from '../app/STATE/models/employee.model';
import {EmployeeScheduleEntry} from '../app/STATE/models/employee-schedule-entry.model';
import {PhonePipe} from '../app/common/pipes/phone.pipe';
import * as moment from 'moment';


export const environment = {
  production: false
};

export const APP_CONFIG = Object.freeze({
  API_BASE_URL: '//api.brainstorm.live/api/Hub/',
  LS_TOKEN_KEY: 'pc_token',
  IMAGE_SHACK_API_KEY: '8BFIKQUV83c9eadf875606030278dbaa42f4cded',
  SHOW_SUMMARY: false,
  AUTO_REDIRECT_TIMER: 5000,
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

/* --------------------------------------------------- */
/* ----------Here you could set sms template---------- */
/* --------------------------------------------------- */
export const getSMSMessage = (profile: Employee, scheduleEntry: EmployeeScheduleEntry): string => {
  if (!profile || !scheduleEntry) {
    return '';
  }
  let phonePipe = new PhonePipe();
  let m = moment({year: scheduleEntry.Year, month: scheduleEntry.Month - 1, day: scheduleEntry.Day});
  return `Good Morning,

I’m looking for my ${scheduleEntry.LaborCode} ${scheduleEntry.ShiftCode} Shift coverage on ${m.format('dddd, MMMM D, YYYY')}. ` +
`If you are interested please contact me with the information below.

${phonePipe.transform(profile.MobilePhone)}
${profile.Email}`;
};

