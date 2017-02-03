import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription, Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {Location} from '@angular/common';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import emailMask from 'text-mask-addons/dist/emailMask'

import {Employee, EditEmployeeRequestData} from '../../../STATE/models/employee.model';
import {AppState, profileSelectors} from '../../../STATE/reducers/index';
import {PhonePipe} from '../../../common/pipes/phone.pipe';
import {ProfileClearErrorAction, UpdateProfileAction} from '../../../STATE/actions/profile.actions';

/* tslint:disable */
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
/* tslint:enable */

@Component({
  selector: 'pcl-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit, OnDestroy {
  editProfileForm: FormGroup;
  phoneMask = [/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  currencyMask = createNumberMask();
  emailMask = emailMask;
  errorMsg$: Observable<string>;
  loading$: Observable<boolean>;
  profile: Employee;
  sub: Subscription;

  constructor(private _fb: FormBuilder,
              private store: Store<AppState>,
              private _location: Location
  ) {
    this.editProfileForm = this._fb.group({
      FirstName: [{value: '', disabled: true}, Validators.required],
      LastName: [{value: '', disabled: true}, Validators.required],
      WorkUnitValue: ['', [Validators.pattern(/\d+/)]],
      Email: ['', [Validators.required, Validators.pattern(emailRegex)]],
      MobilePhone: ['', [Validators.required, Validators.pattern(/\d{3}-\d{3}-\d{4}/)]]
    });
  }

  ngOnInit() {
    this.sub = this.store.select(profileSelectors.getMyProfile)
      .subscribe(employee => {
        if (employee) {
          this.profile = employee;
          this.editProfileForm.get('FirstName').setValue(employee.FirstName || '');
          this.editProfileForm.get('LastName').setValue(employee.LastName || '');
          this.editProfileForm.get('WorkUnitValue').setValue(employee.WorkUnitValue || '');
          this.editProfileForm.get('Email').setValue(employee.Email || '');
          this.editProfileForm.get('MobilePhone').setValue((new PhonePipe).transform(employee.MobilePhone) || '');
          setTimeout(() => this.sub.unsubscribe(), 0);
        }
      });
    this.errorMsg$ = this.store.select(profileSelectors.getMyProfileErrorMsg);
    this.loading$ = this.store.select(profileSelectors.getLoadingState);
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
    this.store.dispatch(new ProfileClearErrorAction());
  }

  onSubmit(formData) {
    let data: EditEmployeeRequestData = {
      mobilePhone: formData.MobilePhone.replace(/\D+/g, ''),
      workUnitValue: +formData.WorkUnitValue.replace(/\D+/g, '') || -1,
      email: formData.Email
    };
    if (data.mobilePhone === this.profile.MobilePhone) {
      delete data.mobilePhone;
    }
    if (data.email === this.profile.Email) {
      delete data.email;
    }
    this.store.dispatch(new ProfileClearErrorAction());
    this.store.dispatch(new UpdateProfileAction(data));
  }

  onBackBtnClick() {
    this._location.back();
  }

  getPhotoUrl(profile: Employee): string {
    if (!profile || !profile.PhotoUrl) {
      return '';
    } else {
      return `url(${profile.PhotoUrl})`;
    }
  }

}
