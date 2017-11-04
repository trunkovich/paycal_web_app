export interface ScheduleRequestIDRequest {
  scheduleRequestId: number;
}

export interface SubmitVacationWindowRequest extends ScheduleRequestIDRequest {
  dates: string[];
}

export interface SubmitCallUnavailabilityWindowRequest extends ScheduleRequestIDRequest {
  dates: Array<{date: string; type: number; }>;
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
  label: number;
  startDate: string;
  endDate: string;
}

export interface UpdateScheduleRequestUseCompTimeRequest extends ScheduleRequestIDRequest {
  useCompTime: boolean;
}

export interface UpdateScheduleRequestEmployeeNotesRequest extends ScheduleRequestIDRequest {
  employeeNotes: string;
}
