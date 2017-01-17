import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Employee} from '../../STATE/models/employee.model';
import {AppState} from '../../STATE/models/app-state.model';
import {Store} from '@ngrx/store';
import {LogoutAction} from '../../STATE/actions/auth.actions';
import {isMobile} from '../../core/check-mobile';

@Component({
  selector: 'pcl-other',
  template: `
    <p>Is it phone? - {{isMobile}}</p>
    <p>Authenticated? - {{authenticated$ | async}}</p>
    <div *ngIf="authenticated$ | async">Profile: <pre>{{profile$ | async | json}}</pre></div>
    
    <div><button [routerLink]="['/','registration']">Sign Up</button></div>
    <div><button [disabled]="authenticated$ | async" [routerLink]="['/','login']">Sign In</button></div>
    <div><button [disabled]="!(authenticated$ | async)" (click)="logout()">Logout</button></div>
    
  `,
  styles: [`
  :host {
    display: block;
    padding: 20px;
  }
  p,div {
    margin-bottom: 10px;
  }
  p {
    font-size: 16px;
  }
  
  button {
    width: 100%;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
  }
`]
})
export class OtherComponent implements OnInit {
  authenticated$: Observable<boolean>;
  profile$: Observable<Employee>;
  isMobile = isMobile;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.authenticated$ = this.store.select(state => state.auth.authenticated);
    this.profile$ = this.store.select(state => state.profile.employee);
  }

  logout() {
    this.store.dispatch(new LogoutAction());
  }

}
