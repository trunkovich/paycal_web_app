/**
 * Created by TrUnK on 26.02.2017.
 */
import {Injectable} from '@angular/core';
import {Effect, Actions, toPayload} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {Angulartics2Mixpanel} from 'angulartics2';
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
import {Employee} from '../models/employee.model';
import {CalendarTypes} from '../models/calendar.types';
import {AuthService} from '../../core/services/auth.service';

@Injectable()
export class MixpanelEffects {
  constructor(private actions$: Actions, private angulartics2: Angulartics2Mixpanel, private authService: AuthService) { }

  @Effect()
  startInitTracking$: Observable<Action> = this.actions$
    .ofType(profileActions.ActionTypes.GET_USER_PROFILE_SUCCESS)
    .map(toPayload)
    .map((profile: Employee) => {
      return new InitTrackingAction(profile);
    })
    .delay(1);

  @Effect()
  startTrackHomeViewOpened$: Observable<Action> = this.actions$
    .ofType(homeActions.ActionTypes.SET_HOME_VIEW_TYPE)
    .map(toPayload)
    .map((view) => {
      return new TrackHomeViewOpenedAction(view);
    })
    .delay(1);

  @Effect()
  startTrackShiftCoverageRequested$: Observable<Action> = this.actions$
    .ofType(homeActions.ActionTypes.CREATE_COVERAGE_REQUEST)
    .map(toPayload)
    .map((data) => {
      return new TrackShiftCoverageRequestedAction(data);
    })
    .delay(1);

  @Effect()
  startAliasTrakcingUser$: Observable<Action> = this.actions$
    .ofType(authActions.ActionTypes.COMPLETE_REGISTRATION_SUCCESS)
    .switchMap(() => {
      return this.authService.getProfile()
        .map((profile: Employee) => new mixpanelActions.AliasTrackingUserAction(profile.EmployeeID));
    })
    .delay(1);




  @Effect()
  initTracking$: Observable<Action> = this.actions$
    .ofType(mixpanelActions.ActionTypes.INIT_TRACKING)
    .map(toPayload)
    .do((profile: Employee) => {
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
    })
    .map(() => new TrackAppLaunchedAction());

  @Effect({ dispatch: false })
  aliasTrakcingUser$: Observable<Action> = this.actions$
    .ofType(mixpanelActions.ActionTypes.ALIAS_TRACKING_USER)
    .map(toPayload)
    .do((id: number) => this.angulartics2.setAlias(id));

  @Effect({ dispatch: false })
  trackAppLaunched$: Observable<Action> = this.actions$
    .ofType(mixpanelActions.ActionTypes.TRACK_APP_LAUNCHED)
    .do(() => this.angulartics2.eventTrack('App Launched', null));

  @Effect({ dispatch: false })
  trackHomeViewOpened$: Observable<Action> = this.actions$
    .ofType(mixpanelActions.ActionTypes.TRACK_HOME_VIEW_OPENED)
    .map(toPayload)
    .do((viewType: CalendarTypes) => {
      let type = (viewType === CalendarTypes.DAY ? 'day' : (viewType === CalendarTypes.WEEK ? 'week' : 'two-week'));
      this.angulartics2.eventTrack('Home View Opened', { type });
    });

  @Effect({ dispatch: false })
  trackEmployeesRequested$: Observable<Action> = this.actions$
    .ofType(mixpanelActions.ActionTypes.TRACK_EMPLOYEES_REQUESTED)
    .map(toPayload)
    .do((employeeScheduleEntryID: number) => this.angulartics2.eventTrack('Employees Requested', { employeeScheduleEntryID }));

  @Effect({ dispatch: false })
  trackMessageFeatureOpened$: Observable<Action> = this.actions$
    .ofType(mixpanelActions.ActionTypes.TRACK_MESSAGE_FEATURE_OPENED)
    .map(toPayload)
    .do((employeeScheduleEntryID: number) => this.angulartics2.eventTrack('Message Feature Opened', { employeeScheduleEntryID }));

  @Effect({ dispatch: false })
  trackShiftCoverageRequested$: Observable<Action> = this.actions$
    .ofType(mixpanelActions.ActionTypes.TRACK_SHIFT_COVERAGE_REQUESTED)
    .map(toPayload)
    .do(({employeeScheduleEntryID, message, delimitedIDs}) => {
      this.angulartics2.eventTrack('Shift Coverage Requested', {employeeScheduleEntryID, message, delimitedIDs});
    });

  @Effect({ dispatch: false })
  trackCallUsClicked$: Observable<Action> = this.actions$
    .ofType(mixpanelActions.ActionTypes.TRACK_CALL_US_CLICKED)
    .do(() => this.angulartics2.eventTrack('Call Us Clicked', null));

  @Effect({ dispatch: false })
  trackEmailUsClicked$: Observable<Action> = this.actions$
    .ofType(mixpanelActions.ActionTypes.TRACK_EMAIL_US_CLICKED)
    .do(() => this.angulartics2.eventTrack('Email Us Clicked', null));

  @Effect({ dispatch: false })
  trackRegistrationFormLanded$: Observable<Action> = this.actions$
    .ofType(mixpanelActions.ActionTypes.TRACK_REGISTRATION_FORM_LANDED)
    .do(() => this.angulartics2.eventTrack('Registration Form Landed', null));

  @Effect({ dispatch: false })
  trackRegistrationFormSubmitted$: Observable<Action> = this.actions$
    .ofType(mixpanelActions.ActionTypes.TRACK_REGISTRATION_FORM_SUBMITTED)
    .do(() => this.angulartics2.eventTrack('Registration Form Submitted', null));
}
