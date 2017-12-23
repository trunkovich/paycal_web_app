export interface ScheduleRequestIDRequest {
  scheduleRequestId: number;
}

export interface SubmitVacationWindowRequest extends ScheduleRequestIDRequest {
  dates: Array<{type: number; start: string; end: string}>;
}

export interface SubmitCallUnavailabilityWindowRequest extends ScheduleRequestIDRequest {
  dates: Array<{date: string; type: number; }>;
}

export interface SubmitEducationLeavesRequest extends ScheduleRequestIDRequest {
  dates: Array<{date: string; name: string; description: string; }>;
}

export interface SubmitCallNightsRequest extends ScheduleRequestIDRequest {
  dates: {[key: string]: string; };
}

export interface SubmitHospiralistRoundingRequest extends ScheduleRequestIDRequest {
  dates: Array<{start: string; end: string; }>;
}

export interface CreateVacationWindowRequest extends ScheduleRequestIDRequest {
  vacationWindowTypeID: number;
  startDate: string;
  endDate: string;
}

export interface CreateCallUnavailabilityWindowRequest extends ScheduleRequestIDRequest {
  callUnavailabilityTypeID: number;
  date: string;
}

export interface CreatePreferredCallNightRequest extends ScheduleRequestIDRequest {
  callNightTypeID: number;
  date: string;
}

export interface CreateHospitalRoundingRequest extends ScheduleRequestIDRequest {
  roundingTypeID: number;
  startDate: string;
  endDate: string;
}

export interface CreateVolunteerShiftRequest extends ScheduleRequestIDRequest {
  hospitalID: number;
  shiftID: number;
  date: string;
}

export interface CreateEducationalLeaveRequest extends ScheduleRequestIDRequest {
  activityName: string;
  activityDescription: string;
  date: string;
}

export interface CreatePreferredOffWeekendRequest extends ScheduleRequestIDRequest {
  label: string;
  startDate: string;
  endDate: string;
}

export interface UpdateScheduleRequestUseCompTimeRequest extends ScheduleRequestIDRequest {
  useCompTime: boolean;
}

export interface UpdateScheduleRequestEmployeeNotesRequest extends ScheduleRequestIDRequest {
  employeeNotes: string;
}
