import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from "@angular/forms";
import {Credentials} from "../../../STATE/models/credentials.model";
import {Store} from "@ngrx/store";
import {AppState} from "../../../STATE/models/app-state.model";
import {SignInAction, SignInClearErrorAction} from "../../../STATE/actions/auth.actions";
import {MdIconRegistry} from "@angular/material";
import {DomSanitizer} from "@angular/platform-browser";
import {Observable} from "rxjs";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  mask = [/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  showPassword: boolean = false;
  errorMsg$: Observable<string>;
  signInLoading$: Observable<boolean>;

  constructor(
    private _fb: FormBuilder,
    private store: Store<AppState>,
    private mdIconRegistry: MdIconRegistry,
    private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.loginForm = this._fb.group({
      //TODO: Don't forget to remove hardcoded data
      phone: ['714-746-1213', [Validators.required, Validators.pattern(/\d{3}-\d{3}-\d{4}/)]],
      password: ['Paula100', Validators.required],
      rememberMe: [true, Validators.required]
    });
    this.errorMsg$ = this.store.select(state => state.auth.errorMsg);
    this.signInLoading$ = this.store.select(state => state.auth.loading);
    this.mdIconRegistry.addSvgIcon(
      'eye-outline',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/svg/eye-outline.svg')
    );
    this.mdIconRegistry.addSvgIcon(
      'eye-outline-off',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/svg/eye-outline-off.svg')
    );
  }

  ngOnDestroy() {
    this.store.dispatch(new SignInClearErrorAction());
  }

  onSubmit(data) {
    let credentials: Credentials = {
      phone: data.phone.replace(/\D+/g, ''),
      password: data.password,
      rememberMe: data.rememberMe
    };
    this.store.dispatch(new SignInClearErrorAction());
    this.store.dispatch(new SignInAction(credentials));
  }

  togglePassword(el:HTMLElement) {
    this.showPassword = !this.showPassword;
    el.setAttribute('type', this.getType());
  }

  private getType() {
    return this.showPassword ? 'text' : 'password';
  }

}
