/**
 * Created by TrUnK on 16.01.2017.
 */
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as referencesActions from '../actions/references.actions';
import { ReferencesService } from '../../core/services/references.service';
import { GroupPosition } from '../models/group-position.model';
import { GroupSpecialization } from '../models/group-specialization.model';
import { Region } from '../models/region.model';
import { State } from '../models/state.model';
import { TimeZone } from '../models/time-zone.model';
import { ReferenceType } from '../models/reference-type.model';
import { EmployeeStatus } from '../models/employee-status.model';
import { AppState, profileSelectors } from '../reducers/index';
import { CallUnavailabilityType } from '../models/call-unavailability-type.model';
import { CallNightType } from '../models/call-night-type.model';
import { HospitalistRoundingType } from '../models/hospitalist-rounding-type.model';
import { Hospital } from '../models/hospital.model';
import { ShiftType } from '../models/shift-type.model';
import { ScheduleRequestStatusType } from '../models/schedule-request-status.model';
import { VacationWindowType } from '../models/vacation-window-type.model';
import { catchError, filter, first, map, switchMap } from 'rxjs/operators';

@Injectable()
export class ReferencesEffects {
  constructor(private actions$: Actions, private referencesService: ReferencesService, private store: Store<AppState>) { }

  @Effect()
  getGroupPositions$: Observable<Action> = this.actions$
    .ofType(referencesActions.ActionTypes.LOAD_GROUP_POSITIONS)
    .pipe(
      map((action: referencesActions.LoadGroupPositionsAction) => action.payload),
      switchMap((data: {groupId: number}) => this.referencesService.getGroupPositions(data)),
      map((groupPositions: GroupPosition[]) => new referencesActions.LoadGroupPositionsSuccessAction(groupPositions)),
      catchError(error => Observable.of(new referencesActions.LoadGroupPositionsFailAction(error)))
    );

  @Effect()
  getGroupSpecializations$: Observable<Action> = this.actions$
    .ofType(referencesActions.ActionTypes.LOAD_GROUP_SPECIALIZATIONS)
    .pipe(
      map((action: referencesActions.LoadGroupSpecializationsAction) => action.payload),
      switchMap((data: {groupId: number}) => this.referencesService.getGroupSpecializations(data)),
      map((groupSpecializations: GroupSpecialization[]) => {
        return new referencesActions.LoadGroupSpecializationsSuccessAction(groupSpecializations);
      }),
      catchError(error => Observable.of(new referencesActions.LoadGroupSpecializationsFailAction(error)))
    );

  @Effect()
  getRegions$: Observable<Action> = this.actions$
    .ofType(referencesActions.ActionTypes.LOAD_REGIONS)
    .pipe(
      switchMap(() => this.referencesService.getRegions()),
      map((regions: Region[]) => regions.sort((a, b) => a.DisplayOrder - b.DisplayOrder)),
      map((regions: Region[]) => new referencesActions.LoadRegionsSuccessAction(regions)),
      catchError(error => Observable.of(new referencesActions.LoadRegionsFailAction(error)))
    );

  @Effect()
  getStates$: Observable<Action> = this.actions$
    .ofType(referencesActions.ActionTypes.LOAD_STATES)
    .pipe(
      switchMap(() => this.referencesService.getStates()),
      map((states: State[]) => new referencesActions.LoadStatesSuccessAction(states)),
      catchError(error => Observable.of(new referencesActions.LoadStatesFailAction(error)))
    );

  @Effect()
  getTimeZones$: Observable<Action> = this.actions$
    .ofType(referencesActions.ActionTypes.LOAD_TIME_ZONES)
    .pipe(
      switchMap(() => this.referencesService.getTimeZones()),
      map((timeZones: TimeZone[]) => new referencesActions.LoadTimeZonesSuccessAction(timeZones)),
      catchError(error => Observable.of(new referencesActions.LoadTimeZonesFailAction(error)))
    );

  @Effect()
  getReferencesTypes$: Observable<Action> = this.actions$
    .ofType(referencesActions.ActionTypes.LOAD_REFERENCES_TYPES)
    .pipe(
      switchMap(() => this.referencesService.getReferenceTypes()),
      map((referencesTypes: ReferenceType[]) => new referencesActions.LoadReferencesTypesSuccessAction(referencesTypes)),
      catchError(error => Observable.of(new referencesActions.LoadReferencesTypesFailAction(error)))
    );

  @Effect()
  getEmployeeStatuses$: Observable<Action> = this.actions$
    .ofType(referencesActions.ActionTypes.LOAD_EMPLOYEE_STATUSES)
    .pipe(
      switchMap(() => this.referencesService.getEmployeeStatuses()),
      map((employeeStatuses: EmployeeStatus[]) => new referencesActions.LoadEmployeeStatusesSuccessAction(employeeStatuses)),
      catchError(error => Observable.of(new referencesActions.LoadEmployeeStatusesFailAction(error)))
    );

  @Effect()
  getCallUnavailabilityTypes$: Observable<Action> = this.actions$
    .ofType(referencesActions.ActionTypes.LOAD_CALL_UNAVAILABILITY_TYPES)
    .pipe(
      switchMap(
      () => this.store.select(profileSelectors.getGroupId)
        .pipe(
          filter(groupId => !!groupId),
          first()
        )
      ),
      switchMap((groupId) => this.referencesService.getCallUnavailabilityTypes(groupId)),
      map((types: CallUnavailabilityType[]) => new referencesActions.LoadCallUnavailabilityTypesSuccessAction(types)),
      catchError(error => Observable.of(new referencesActions.LoadCallUnavailabilityTypesFailAction(error)))
    );

  @Effect()
  getCallNightsTypes$: Observable<Action> = this.actions$
    .ofType(referencesActions.ActionTypes.LOAD_CALL_NIGHT_TYPES)
    .pipe(
      switchMap(
      () => this.store.select(profileSelectors.getGroupId)
        .pipe(
          filter(groupId => !!groupId),
          first()
        )
      ),
      switchMap((groupId) => this.referencesService.getCallNightTypes(groupId)),
      map((types: CallNightType[]) => new referencesActions.LoadCallNightTypesSuccessAction(types)),
      catchError(error => Observable.of(new referencesActions.LoadCallNightTypesFailAction(error)))
    );

  @Effect()
  getHospitalistRoundingTypes$: Observable<Action> = this.actions$
    .ofType(referencesActions.ActionTypes.LOAD_HOSPITALIST_ROUNDING_TYPES)
    .pipe(
      switchMap(
      () => this.store.select(profileSelectors.getGroupId)
        .pipe(
          filter(groupId => !!groupId),
          first()
        )
      ),
      switchMap((groupId) => this.referencesService.getHospitalistRoundingTypes(groupId)),
      map((types: HospitalistRoundingType[]) => new referencesActions.LoadHospitalistRoundingTypesSuccessAction(types)),
      catchError(error => Observable.of(new referencesActions.LoadHospitalistRoundingTypesFailAction(error)))
    );

  @Effect()
  getHospitals$: Observable<Action> = this.actions$
    .ofType(referencesActions.ActionTypes.LOAD_HOSPITALS)
    .pipe(
      switchMap(
      () => this.store.select(profileSelectors.getGroupId)
        .pipe(
          filter(groupId => !!groupId),
          first()
        )
      ),
      switchMap((groupId) => this.referencesService.getHospitals(groupId)),
      map((hospitals: Hospital[]) => new referencesActions.LoadHospitalsSuccessAction(hospitals)),
      catchError(error => Observable.of(new referencesActions.LoadHospitalsFailAction(error)))
    );

  @Effect()
  getShiftTypes$: Observable<Action> = this.actions$
    .ofType(referencesActions.ActionTypes.LOAD_SHIFT_TYPES)
    .pipe(
      switchMap(
      () => this.store.select(profileSelectors.getGroupId)
        .pipe(
          filter(groupId => !!groupId),
          first()
        )
      ),
      switchMap((groupId) => this.referencesService.getShiftTypes(groupId)),
      map((types: ShiftType[]) => new referencesActions.LoadShiftTypesSuccessAction(types)),
      catchError(error => Observable.of(new referencesActions.LoadShiftTypesFailAction(error)))
    );

  @Effect()
  getScheduleRequestStatusTypes$: Observable<Action> = this.actions$
    .ofType(referencesActions.ActionTypes.LOAD_SCHEDULE_REQUEST_STATUS_TYPES)
    .pipe(
      switchMap(
      () => this.store.select(profileSelectors.getGroupId)
        .pipe(
          filter(groupId => !!groupId),
          first()
        )
      ),
      switchMap((groupId) => this.referencesService.getScheduleRequestStatusTypes(groupId)),
      map((types: ScheduleRequestStatusType[]) => new referencesActions.LoadScheduleRequestStatusTypesSuccessAction(types)),
      catchError(error => Observable.of(new referencesActions.LoadScheduleRequestStatusTypesFailAction(error)))
    );

  @Effect()
  getVacationWindowTypes$: Observable<Action> = this.actions$
    .ofType(referencesActions.ActionTypes.LOAD_VACATION_WINDOW_TYPES)
    .pipe(
      switchMap(
      () => this.store.select(profileSelectors.getGroupId)
        .pipe(
          filter(groupId => !!groupId),
          first()
        )
      ),
      switchMap((groupId) => this.referencesService.getVacationWindowTypes(groupId)),
      map((types: VacationWindowType[]) => new referencesActions.LoadVacationWindowTypesSuccessAction(types)),
      catchError(error => Observable.of(new referencesActions.LoadVacationWindowTypesFailAction(error)))
    );

}
