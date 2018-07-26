// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

import { Employee } from '../app/STATE/models/employee.model';
import { EmployeeScheduleEntry } from '../app/STATE/models/employee-schedule-entry.model';
import { PhonePipe } from '../app/common/pipes/phone.pipe';
import * as moment from 'moment';


export const environment = {
  production: false
};

export const APP_CONFIG = Object.freeze({
  EMAIL: 'Jeff@pmtkp.com',
  PHONE: '7144100280',
  API_BASE_URL: '//api.brainstorm.live/api/Hub/',
  LS_TOKEN_KEY: 'pc_token',
  CLOUDINARY_URL: 'https://api.cloudinary.com/v1_1/paycal/image/upload',
  CLOUDINARY_UNSIGNED_PRESET: 't9qbnqhp',
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
  RESET_PASSWORD_URL: 'password-reset',
  SCHEDULERS_EMAIL: 'kpocobgphyschange@kp.org'
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
  return `Hello,

This is ${profile.FirstName} ${profile.LastName}. ` +
`Will you be available to cover my ${scheduleEntry.LaborCode} ${scheduleEntry.ShiftCode} shift on ${m.format('dddd, MMMM D, YYYY')}? ` +
`My mobile phone number is ${phonePipe.transform(profile.MobilePhone)} and my email is ${profile.Email}. ` +
`Please let me know. Thanks!`;
};

export const CALENDAR_COLORS = Object.freeze({
  2017: {
    1: { 1: 'yellow',  2: 'red', 6: 'green', 15: 'blue', 20: 'green', 29: 'yellow' },
    2: { 3: 'green', 12: 'blue', 17: 'green', 26: 'yellow' },
    3: { 3: 'green', 12: 'blue', 17: 'green', 26: 'pink', 31: 'green' },
    4: { 9: 'yellow', 14: 'green', 23: 'blue', 28: 'green' },
    5: { 7: 'yellow', 12: 'green', 21: 'blue', 26: 'green', 29: 'red' },
    6: { 4: 'yellow', 9: 'green', 18: 'blue', 23: 'green' },
    7: { 2: 'yellow', 4: 'red', 7: 'green', 16: 'blue', 21: 'green', 30: 'yellow' },
    8: { 4: 'green', 13: 'blue', 18: 'green', 27: 'yellow' },
    9: { 1: 'green', 4: 'red', 10: 'blue', 15: 'green', 24: 'pink', 29: 'green' },
    10: { 8: 'yellow', 13: 'green', 22: 'blue', 27: 'green' },
    11: { 5: 'yellow', 10: 'green', 19: 'blue', 23: 'red', 24: 'green' },
    12: { 3: 'yellow', 8: 'green', 17: 'blue', 22: 'green', 25: 'red', 31: 'yellow' }
  },
  2018: {
    1: { 1: 'red', 5: 'green', 14: 'blue', 19: 'green', 28: 'yellow' },
    2: { 2: 'green', 11: 'blue', 16: 'green', 25: 'yellow' },
    3: { 2: 'green', 11: 'blue', 16: 'green', 25: 'pink', 30: 'green' },
    4: { 8: 'yellow', 13: 'green', 22: 'blue', 27: 'green' },
    5: { 6: 'yellow', 11: 'green', 20: 'blue', 25: 'green', 28: 'red' },
    6: { 3: 'yellow', 8: 'green', 17: 'blue', 22: 'green' },
    7: { 1: 'yellow', 4: 'red', 6: 'green', 15: 'blue', 20: 'green', 29: 'yellow' },
    8: { 3: 'green', 12: 'blue', 17: 'green', 26: 'pink', 31: 'green'},
    9: { 3: 'red', 9: 'yellow', 14: 'green', 23: 'blue', 28: 'green' },
    10: { 7: 'yellow', 12: 'green', 21: 'blue', 26: 'green' },
    11: { 4: 'yellow', 9: 'green', 18: 'blue', 22: 'red', 23: 'green' },
    12: { 2: 'yellow', 7: 'green', 16: 'blue', 21: 'green', 25: 'red', 30: 'yellow' }
  }
});
