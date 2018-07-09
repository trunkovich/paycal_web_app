/**
 * Created by TrUnK on 26.02.2017.
 */
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Angulartics2Mixpanel } from 'angulartics2/mixpanel';
import * as _ from 'lodash';
import * as profileActions from '../actions/profile.actions';
import * as homeActions from '../actions/home.actions';
import * as authActions from '../actions/auth.actions';
import * as mixpanelActions from '../actions/mixpanel.actions';
import {
  InitTrackingAction,
  TrackAppLaunchedAction,
  TrackHomeViewOpenedAction,
  TrackShiftCoverageRequestedAction
} from '../actions/mixpanel.actions';
import { Employee } from '../models/employee.model';
import { CalendarTypes } from '../models/calendar.types';
import { AuthService } from '../../core/services/auth.service';
import { map, switchMap, tap, delay } from 'rxjs/operators';

@Injectable()
export class MixpanelEffects {
  constructor(private actions$: Actions, private angulartics2: Angulartics2Mixpanel, private authService: AuthService) { }

  @Effect()
  startInitTracking$: Observable<Action> = this.actions$
    .ofType(profileActions.ActionTypes.GET_USER_PROFILE_SUCCESS)
    .pipe(
      map((action: profileActions.GetUserProfileSuccessAction) => action.payload),
      map((profile: Employee) => {
        return new InitTrackingAction(profile);
      }),
      delay(1)
    );

  @Effect()
  startTrackHomeViewOpened$: Observable<Action> = this.actions$
    .ofType(homeActions.ActionTypes.SET_HOME_VIEW_TYPE)
    .pipe(
      map((action: homeActions.SetHomeViewTypeAction) => action.payload),
      map((view) => new TrackHomeViewOpenedAction(view)),
      delay(1)
    );

  @Effect()
  startTrackShiftCoverageRequested$: Observable<Action> = this.actions$
    .ofType(homeActions.ActionTypes.CREATE_COVERAGE_REQUEST)
    .pipe(
      map((action: homeActions.CreateCoverageRequestAction) => action.payload),
      map((data) => new TrackShiftCoverageRequestedAction(data)),
      delay(1)
    );

  @Effect()
  startAliasTrakcingUser$: Observable<Action> = this.actions$
    .ofType(authActions.ActionTypes.COMPLETE_REGISTRATION_SUCCESS)
    .pipe(
      switchMap(() => this.authService.getProfile()),
      map((profile: Employee) => new mixpanelActions.AliasTrackingUserAction(profile.EmployeeID)),
      delay(1)
    );

  @Effect()
  initTracking$: Observable<Action> = this.actions$
    .ofType(mixpanelActions.ActionTypes.INIT_TRACKING)
    .pipe(
      map((action: mixpanelActions.InitTrackingAction) => action.payload),
      tap((profile: Employee) => {
        this.angulartics2.setUsername('' + profile.EmployeeID);
        let mp_profile = _.pick(profile, [
          'EmployeeID',
          'EmployeePositionID',
          'EmployeeSpecializationID',
          'EmployeeStatusID',
          'GroupID',
          'WorkUnitValue'
        ]);
        mp_profile = _.assign(mp_profile, {
          $first_name: profile.FirstName,
          $last_name: profile.LastName,
          $email: profile.Email,
          $phone: profile.MobilePhone
        });
        this.angulartics2.setUserProperties(mp_profile);
      }),
      map(() => new TrackAppLaunchedAction())
    );

  @Effect({ dispatch: false })
  aliasTrakcingUser$ = this.actions$
    .ofType(mixpanelActions.ActionTypes.ALIAS_TRACKING_USER)
    .pipe(
      map((action: mixpanelActions.AliasTrackingUserAction) => action.payload),
      tap((id: number) => this.angulartics2.setAlias(id))
    );

  @Effect({ dispatch: false })
  trackAppLaunched$: Observable<Action> = this.actions$
    .ofType(mixpanelActions.ActionTypes.TRACK_APP_LAUNCHED)
    .pipe(
      tap(() => this.angulartics2.eventTrack('App Launched', null))
    );

  @Effect({ dispatch: false })
  trackHomeViewOpened$ = this.actions$
    .ofType(mixpanelActions.ActionTypes.TRACK_HOME_VIEW_OPENED)
    .pipe(
      map((action: mixpanelActions.TrackHomeViewOpenedAction) => action.payload),
      tap((viewType: CalendarTypes) => {
        let type = (viewType === CalendarTypes.DAY ? 'day' : (viewType === CalendarTypes.WEEK ? 'week' : 'two-week'));
        this.angulartics2.eventTrack('Home View Opened', { type });
      })
    );

  @Effect({ dispatch: false })
  trackEmployeesRequested$ = this.actions$
    .ofType(mixpanelActions.ActionTypes.TRACK_EMPLOYEES_REQUESTED)
    .pipe(
      map((action: mixpanelActions.TrackEmployeesRequestedAction) => action.payload),
      tap((employeeScheduleEntryID: number) => {
        return this.angulartics2.eventTrack('Employees Requested', { employeeScheduleEntryID });
      })
    );

  @Effect({ dispatch: false })
  trackMessageFeatureOpened$ = this.actions$
    .ofType(mixpanelActions.ActionTypes.TRACK_MESSAGE_FEATURE_OPENED)
    .pipe(
      map((action: mixpanelActions.TrackMessageGeatureOpenedAction) => action.payload),
      tap((employeeScheduleEntryID: number) => {
        return this.angulartics2.eventTrack('Message Feature Opened', { employeeScheduleEntryID })
      })
    );

  @Effect({ dispatch: false })
  trackShiftCoverageRequested$ = this.actions$
    .ofType(mixpanelActions.ActionTypes.TRACK_SHIFT_COVERAGE_REQUESTED)
    .pipe(
      map((action: mixpanelActions.TrackShiftCoverageRequestedAction) => action.payload),
      tap(({employeeScheduleEntryID, message, delimitedIDs}) => {
        this.angulartics2.eventTrack('Shift Coverage Requested', {employeeScheduleEntryID, message, delimitedIDs});
      })
    );

  @Effect({ dispatch: false })
  trackCallUsClicked$: Observable<Action> = this.actions$
    .ofType(mixpanelActions.ActionTypes.TRACK_CALL_US_CLICKED)
    .pipe(
      tap(() => this.angulartics2.eventTrack('Call Us Clicked', null))
    );

  @Effect({ dispatch: false })
  trackEmailUsClicked$: Observable<Action> = this.actions$
    .ofType(mixpanelActions.ActionTypes.TRACK_EMAIL_US_CLICKED)
    .pipe(
      tap(() => this.angulartics2.eventTrack('Email Us Clicked', null))
    );

  @Effect({ dispatch: false })
  trackRegistrationFormLanded$: Observable<Action> = this.actions$
    .ofType(mixpanelActions.ActionTypes.TRACK_REGISTRATION_FORM_LANDED)
    .pipe(
      tap(() => this.angulartics2.eventTrack('Registration Form Landed', null))
    );

  @Effect({ dispatch: false })
  trackRegistrationFormSubmitted$: Observable<Action> = this.actions$
    .ofType(mixpanelActions.ActionTypes.TRACK_REGISTRATION_FORM_SUBMITTED)
    .pipe(
      tap(() => this.angulartics2.eventTrack('Registration Form Submitted', null))
    );

}
