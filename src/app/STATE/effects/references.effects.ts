/**
 * Created by TrUnK on 16.01.2017.
 */
import { Injectable } from '@angular/core';
import {Effect, Actions, toPayload} from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as referencesActions from '../actions/references.actions';
import {ReferencesService} from '../../core/services/references.service';
import {GroupPosition} from '../models/group-position.model';
import {GroupSpecialization} from '../models/group-specialization.model';
import {Region} from '../models/region.model';
import {State} from '../models/state.model';
import {TimeZone} from '../models/time-zone.model';
import {ReferenceType} from '../models/reference-type.model';
import {EmployeeStatus} from '../models/employee-status.model';

@Injectable()
export class ReferencesEffects {
  constructor(private actions$: Actions, private referencesService: ReferencesService) { }

  @Effect()
  getGroupPositions$: Observable<Action> = this.actions$
    .ofType(referencesActions.ActionTypes.LOAD_GROUP_POSITIONS)
    .map(toPayload)
    .switchMap((data: {groupId: number}) => {
      return this.referencesService.getGroupPositions(data)
        .map((groupPositions: GroupPosition[]) => new referencesActions.LoadGroupPositionsSuccessAction(groupPositions))
        .catch(error => Observable.of(new referencesActions.LoadGroupPositionsFailAction(error)));
    });

  @Effect()
  getGroupSpecializations$: Observable<Action> = this.actions$
    .ofType(referencesActions.ActionTypes.LOAD_GROUP_SPECIALIZATIONS)
    .map(toPayload)
    .switchMap((data: {groupId: number}) => {
      return this.referencesService.getGroupSpecializations(data)
        .map((groupSpecializations: GroupSpecialization[]) => {
          return new referencesActions.LoadGroupSpecializationsSuccessAction(groupSpecializations);
        })
        .catch(error => Observable.of(new referencesActions.LoadGroupSpecializationsFailAction(error)));
    });

  @Effect()
  getRegions$: Observable<Action> = this.actions$
    .ofType(referencesActions.ActionTypes.LOAD_REGIONS)
    .startWith(new referencesActions.LoadRegionsAction())
    .switchMap(() => {
      return this.referencesService.getRegions()
        .map((regions: Region[]) => new referencesActions.LoadRegionsSuccessAction(regions))
        .catch(error => Observable.of(new referencesActions.LoadRegionsFailAction(error)));
    });

  @Effect()
  getStates$: Observable<Action> = this.actions$
    .ofType(referencesActions.ActionTypes.LOAD_STATES)
    .startWith(new referencesActions.LoadStatesAction())
    .switchMap(() => {
      return this.referencesService.getStates()
        .map((states: State[]) => new referencesActions.LoadStatesSuccessAction(states))
        .catch(error => Observable.of(new referencesActions.LoadStatesFailAction(error)));
    });

  @Effect()
  getTimeZones$: Observable<Action> = this.actions$
    .ofType(referencesActions.ActionTypes.LOAD_TIME_ZONES)
    .switchMap(() => {
      return this.referencesService.getTimeZones()
        .map((timeZones: TimeZone[]) => new referencesActions.LoadTimeZonesSuccessAction(timeZones))
        .catch(error => Observable.of(new referencesActions.LoadTimeZonesFailAction(error)));
    });

  @Effect()
  getReferencesTypes$: Observable<Action> = this.actions$
    .ofType(referencesActions.ActionTypes.LOAD_REFERENCES_TYPES)
    .switchMap(() => {
      return this.referencesService.getReferenceTypes()
        .map((referencesTypes: ReferenceType[]) => new referencesActions.LoadReferencesTypesSuccessAction(referencesTypes))
        .catch(error => Observable.of(new referencesActions.LoadReferencesTypesFailAction(error)));
    });

  @Effect()
  getEmployeeStatuses$: Observable<Action> = this.actions$
    .ofType(referencesActions.ActionTypes.LOAD_EMPLOYEE_STATUSES)
    .switchMap(() => {
      return this.referencesService.getEmployeeStatuses()
        .map((employeeStatuses: EmployeeStatus[]) => new referencesActions.LoadEmployeeStatusesSuccessAction(employeeStatuses))
        .catch(error => Observable.of(new referencesActions.LoadEmployeeStatusesFailAction(error)));
    });

}
