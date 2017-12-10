import { Pipe, PipeTransform } from '@angular/core';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';

import { CallUnavailabilityType } from '../../../STATE/models/call-unavailability-type.model';
import { AppState, referenceSelectors } from '../../../STATE/reducers/index';
import { LoadCallUnavailabilityTypesAction, LoadHospitalsAction, LoadShiftTypesAction } from '../../../STATE/actions/references.actions';
import { ShiftType } from '../../../STATE/models/shift-type.model';
import { Hospital } from '../../../STATE/models/hospital.model';

@Pipe({
  name: 'callUnavailabilityType',
  pure: false
})
export class CallUnavailabilityTypePipe implements PipeTransform {
  callUnavailabilityTypes: CallUnavailabilityType[];

  constructor(private store: Store<AppState>) {
    store.select(referenceSelectors.getCallUnavailabilityTypes)
      .subscribe((types: CallUnavailabilityType[]) => {
        if (!types || !types.length ) {
          store.dispatch(new LoadCallUnavailabilityTypesAction());
        }
        this.callUnavailabilityTypes = types;
      });
  }

  transform(value: number, args?: any): string {
    if (!this.callUnavailabilityTypes || !this.callUnavailabilityTypes.length) {
      return value ? value.toString() : '';
    }
    let type: CallUnavailabilityType = _.find(this.callUnavailabilityTypes,
      (callUnavailabilityType) => callUnavailabilityType.CallUnavailabilityTypeID === value
    );
    if (type) {
      return type.Description;
    }
    return value ? value.toString() : '';
  }
}

@Pipe({
  name: 'shiftType',
  pure: false
})
export class ShiftTypePipe implements PipeTransform {
  shiftTypes: ShiftType[];

  constructor(private store: Store<AppState>) {
    store.select(referenceSelectors.getShiftTypes)
      .subscribe((types: ShiftType[]) => {
        if (!types || !types.length ) {
          store.dispatch(new LoadShiftTypesAction());
        }
        this.shiftTypes = types;
      });
  }

  transform(value: number, args?: any): string {
    if (!this.shiftTypes || !this.shiftTypes.length) {
      return value ? value.toString() : '';
    }
    let type: ShiftType = _.find(this.shiftTypes,
      (shiftType) => shiftType.ShiftID === value
    );
    if (type) {
      return type.Description;
    }
    return value ? value.toString() : '';
  }
}

@Pipe({
  name: 'hospital',
  pure: false
})
export class HospitalPipe implements PipeTransform {
  hospitals: Hospital[];

  constructor(private store: Store<AppState>) {
    store.select(referenceSelectors.getHospitals)
      .subscribe((hospitals: Hospital[]) => {
        if (!hospitals || !hospitals.length ) {
          store.dispatch(new LoadHospitalsAction());
        }
        this.hospitals = hospitals;
      });
  }

  transform(value: number, args?: any): string {
    if (!this.hospitals || !this.hospitals.length) {
      return value ? value.toString() : '';
    }
    let hospital: Hospital = _.find(this.hospitals,
      (hosp) => hosp.HospitalID === value
    );
    if (hospital) {
      return hospital.Abbreviation;
    }
    return value ? value.toString() : '';
  }
}
