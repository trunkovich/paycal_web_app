/**
 * Created by TrUnK on 16.01.2017.
 */

import { Injectable } from '@angular/core';
import { Api } from './api.service';
import { Observable } from 'rxjs';

import { Response } from '../../STATE/models/responses/response.model';
import {
  ScheduleRequestByEmployeeListResponse,
  ScheduleRequestDetailsResponse
} from '../../STATE/models/responses/create-schedule-response.model';
import { CreateScheduleDetailsModel, CreateScheduleModel } from '../../STATE/models/create-schedule.model';
import {
  CreateCallUnavailabilityWindowRequest,
  CreateEducationalLeaveRequest,
  CreateHospitalRoundingRequest,
  CreatePreferredCallNightRequest,
  CreatePreferredOffWeekendRequest,
  CreateVacationWindowRequest,
  CreateVolunteerShiftRequest,
  UpdateScheduleRequestEmployeeNotesRequest,
  UpdateScheduleRequestUseCompTimeRequest
} from '../../STATE/models/requests/create-schedule-request.model';


@Injectable()
export class CreateScheduleService {

  constructor(private api: Api) {}

  getAllScheduleRequests(): Observable<CreateScheduleModel[] | string> {
    return this.api.getScheduleRequestByEmployee()
      .map((res: ScheduleRequestByEmployeeListResponse) => {
        if (res.IsSuccess) {
          return res.ScheduleRequestList;
        } else {
          throw Error(`Get All Schedule Requests Error. Code: ${res.ErrorCode} Message: ${res.ErrorMessage}`);
        }
      });
  }

  getScheduleRequestDetails(scheduleRequestId): Observable<CreateScheduleDetailsModel | string> {
    return this.api.getScheduleRequestDetails({scheduleRequestId})
      .map((res: ScheduleRequestDetailsResponse) => {
        if (res.IsSuccess) {
          return res.ScheduleRequestDetails;
        } else {
          throw Error(`Get Schedule Request Details Error. Code: ${res.ErrorCode} Message: ${res.ErrorMessage}`);
        }
      });
  }

  deleteCallUnavailabilityWindows(scheduleRequestId): Observable<boolean | string> {
    return this.api.deleteCallUnavailabilityWindows({scheduleRequestId})
      .map((res: Response) => {
        if (res.IsSuccess) {
          return true;
        } else {
          throw Error(`Delete call unavailability windows Error. Code: ${res.ErrorCode} Message: ${res.ErrorMessage}`);
        }
      });
  }

  deletePreferredCallNights(scheduleRequestId): Observable<boolean | string> {
    return this.api.deletePreferredCallNights({scheduleRequestId})
      .map((res: Response) => {
        if (res.IsSuccess) {
          return true;
        } else {
          throw Error(`Delete preferred call nights Error. Code: ${res.ErrorCode} Message: ${res.ErrorMessage}`);
        }
      });
  }

  deleteEducationalLeaves(scheduleRequestId): Observable<boolean | string> {
    return this.api.deleteEducationalLeaves({scheduleRequestId})
      .map((res: Response) => {
        if (res.IsSuccess) {
          return true;
        } else {
          throw Error(`Delete educational leaves Error. Code: ${res.ErrorCode} Message: ${res.ErrorMessage}`);
        }
      });
  }

  deleteHospitalRoundings(scheduleRequestId): Observable<boolean | string> {
    return this.api.deleteHospitalRoundings({scheduleRequestId})
      .map((res: Response) => {
        if (res.IsSuccess) {
          return true;
        } else {
          throw Error(`Delete hospital roundings Error. Code: ${res.ErrorCode} Message: ${res.ErrorMessage}`);
        }
      });
  }

  deletePreferredOffWeekends(scheduleRequestId): Observable<boolean | string> {
    return this.api.deletePreferredOffWeekends({scheduleRequestId})
      .map((res: Response) => {
        if (res.IsSuccess) {
          return true;
        } else {
          throw Error(`Delete preferred off weekends Error. Code: ${res.ErrorCode} Message: ${res.ErrorMessage}`);
        }
      });
  }

  deleteVacationWindows(scheduleRequestId): Observable<boolean | string> {
    return this.api.deleteVacationWindows({scheduleRequestId})
      .map((res: Response) => {
        if (res.IsSuccess) {
          return true;
        } else {
          throw Error(`Delete vacation windows Error. Code: ${res.ErrorCode} Message: ${res.ErrorMessage}`);
        }
      });
  }

  deleteVolunteerShifts(scheduleRequestId): Observable<boolean | string> {
    return this.api.deleteVolunteerShifts({scheduleRequestId})
      .map((res: Response) => {
        if (res.IsSuccess) {
          return true;
        } else {
          throw Error(`Delete volunteer shifts Error. Code: ${res.ErrorCode} Message: ${res.ErrorMessage}`);
        }
      });
  }

  createCallUnavailabilityWindow(data: CreateCallUnavailabilityWindowRequest): Observable<boolean | string> {
    return this.api.createCallUnavailabilityWindow(data)
      .map((res: Response) => {
        if (res.IsSuccess) {
          return true;
        } else {
          throw Error(`Create call unavailability window Error. Code: ${res.ErrorCode} Message: ${res.ErrorMessage}`);
        }
      });
  }

  createEducationalLeave(data: CreateEducationalLeaveRequest): Observable<boolean | string> {
    return this.api.createEducationalLeave(data)
      .map((res: Response) => {
        if (res.IsSuccess) {
          return true;
        } else {
          throw Error(`Create educational leave Error. Code: ${res.ErrorCode} Message: ${res.ErrorMessage}`);
        }
      });
  }

  createHospitalRounding(data: CreateHospitalRoundingRequest): Observable<boolean | string> {
    return this.api.createHospitalRounding(data)
      .map((res: Response) => {
        if (res.IsSuccess) {
          return true;
        } else {
          throw Error(`Create hospital rounding Error. Code: ${res.ErrorCode} Message: ${res.ErrorMessage}`);
        }
      });
  }

  createPreferredCallNight(data: CreatePreferredCallNightRequest): Observable<boolean | string> {
    return this.api.createPreferredCallNight(data)
      .map((res: Response) => {
        if (res.IsSuccess) {
          return true;
        } else {
          throw Error(`Create preferred call night Error. Code: ${res.ErrorCode} Message: ${res.ErrorMessage}`);
        }
      });
  }

  createPreferredOffWeekend(data: CreatePreferredOffWeekendRequest): Observable<boolean | string> {
    return this.api.createPreferredOffWeekend(data)
      .map((res: Response) => {
        if (res.IsSuccess) {
          return true;
        } else {
          throw Error(`Create preferred off weekend Error. Code: ${res.ErrorCode} Message: ${res.ErrorMessage}`);
        }
      });
  }

  createVacationWindow(data: CreateVacationWindowRequest): Observable<boolean | string> {
    return this.api.createVacationWindow(data)
      .map((res: Response) => {
        if (res.IsSuccess) {
          return true;
        } else {
          throw Error(`Create vacation window Error. Code: ${res.ErrorCode} Message: ${res.ErrorMessage}`);
        }
      });
  }

  createVolunteerShift(data: CreateVolunteerShiftRequest): Observable<boolean | string> {
    return this.api.createVolunteerShift(data)
      .map((res: Response) => {
        if (res.IsSuccess) {
          return true;
        } else {
          throw Error(`Create volunteer shift Error. Code: ${res.ErrorCode} Message: ${res.ErrorMessage}`);
        }
      });
  }

  updateScheduleRequestEmployeeNotes(data: UpdateScheduleRequestEmployeeNotesRequest): Observable<boolean | string> {
    return this.api.updateScheduleRequestEmployeeNotes(data)
      .map((res: Response) => {
        if (res.IsSuccess) {
          return true;
        } else {
          throw Error(`Update schedule request employee notes Error. Code: ${res.ErrorCode} Message: ${res.ErrorMessage}`);
        }
      });
  }

  updateScheduleRequestUseCompTime(data: UpdateScheduleRequestUseCompTimeRequest): Observable<boolean | string> {
    return this.api.updateScheduleRequestUseCompTime(data)
      .map((res: Response) => {
        if (res.IsSuccess) {
          return true;
        } else {
          throw Error(`Update schedule request use comp time Error. Code: ${res.ErrorCode} Message: ${res.ErrorMessage}`);
        }
      });
  }

}
