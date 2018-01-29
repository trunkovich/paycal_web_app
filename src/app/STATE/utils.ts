import { AbstractControl, FormGroup } from '@angular/forms';
import * as _ from 'lodash';
import { Injectable } from '@angular/core';

/**
 * This function coerces a string into a string literal type.
 * Using tagged union types in TypeScript 2.0, this enables
 * powerful typechecking of our reducers.
 *
 * Since every action label passes through this function it
 * is a good place to ensure all of our action labels
 * are unique.
 */

let typeCache: { [label: string]: boolean } = {};
export function type<T>(label: T | ''): T {
  if (typeCache[<string>label]) {
    throw new Error(`Action type "${label}" is not unique"`);
  }

  typeCache[<string>label] = true;

  return <T>label;
}

export function matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
  return (group: FormGroup): {[key: string]: any} => {
    let password = group.controls[passwordKey];
    let confirmPassword = group.controls[confirmPasswordKey];

    if (password.value !== confirmPassword.value) {
      return {
        mismatchedPasswords: true
      };
    }
  };
}

export const blobToFile = (theBlob: Blob, fileName: string): File => {
  let b: any = theBlob;
  b.lastModifiedDate = new Date();
  b.name = fileName;
  return <File>theBlob;
};

export function markInvalidFieldsAsTouched(form: FormGroup): void {
  if (form.valid) {
    return;
  }
  _.each(form.controls, (control: AbstractControl) => {
    if (control.invalid) {
      control.markAsTouched();
    }
  });
};

@Injectable()
export class WindowWrapper extends Window {

}

export function getWindow() { return window; }
