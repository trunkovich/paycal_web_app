import { Employee } from '../app/STATE/models/employee.model';
import { EmployeeScheduleEntry } from '../app/STATE/models/employee-schedule-entry.model';
import { PhonePipe } from '../app/common/pipes/phone.pipe';
import * as moment from 'moment';

export const environment = {
  production: true
};

export const APP_CONFIG = Object.freeze({
  EMAIL: 'JefftDuran@gmail.com',
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
  return `Hello,

This is ${profile.FirstName} ${profile.LastName}. ` +
`Will you be available to cover my ${scheduleEntry.LaborCode} ${scheduleEntry.ShiftCode} shift on ${m.format('dddd, MMMM D, YYYY')}? ` +
`My mobile phone number is ${phonePipe.transform(profile.MobilePhone)} and my email is ${profile.Email}. ` +
`Please let me know. Thanks!`;
};
