import {Component, OnInit, ViewChild, ElementRef, EventEmitter, Output, Input} from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import {Observable} from 'rxjs';

import {matchingPasswords} from '../../../STATE/utils';

@Component({
  selector: 'pcl-two-passwords-form',
  templateUrl: './two-passwords-form.component.html',
  styleUrls: ['./two-passwords-form.component.scss']
})
export class TwoPasswordsFormComponent implements OnInit {
  changePasswordForm: FormGroup;
  showPassword= new FormControl(false);
  @Input() error: Observable<string>;
  @Input() loading: Observable<boolean>;
  @Output() onFormSubmit = new EventEmitter();
  @ViewChild('password') password: ElementRef;
  @ViewChild('confirmPassword') confirmPassword: ElementRef;

  constructor(
    private _fb: FormBuilder) {}

  ngOnInit() {
    this.changePasswordForm = this._fb.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
      showPassword: this.showPassword
    }, {validator: matchingPasswords('password', 'confirmPassword')});
    this.showPassword.valueChanges.subscribe((value) => this.togglePassword(value));
  }

  onSubmit() {
    if (this.changePasswordForm.value && this.changePasswordForm.value.password) {
      this.onFormSubmit.emit({
        newPassword: this.changePasswordForm.value.password
      });
    }
  }

  togglePassword(status: boolean) {
    this.password.nativeElement.setAttribute('type', this.getType(status));
    this.confirmPassword.nativeElement.setAttribute('type', this.getType(status));
  }

  private getType(status) {
    return status ? 'text' : 'password';
  }
}
