import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from "@angular/forms";
import {Credentials} from "../../../STATE/models/credentials.model";
import {Store} from "@ngrx/store";
import {AppState} from "../../../STATE/models/app-state.model";
import {SignInAction} from "../../../STATE/actions/auth.actions";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  loginForm: FormGroup;
  mask = [/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  constructor(private _fb: FormBuilder, private store: Store<AppState>) { }

  ngOnInit() {
    this.loginForm = this._fb.group({
      //TODO: Don't forget to remove hardcoded data
      phone: ['714-746-1213', [Validators.required, Validators.pattern(/\d{3}-\d{3}-\d{4}/)]],
      password: ['Paula100', Validators.required]
    })
  }

  onSubmit(data) {
    let credentials: Credentials = {
      phone: data.phone.replace(/\D+/g, ''),
      password: data.password
    };
    this.store.dispatch(new SignInAction(credentials));
  }

}
