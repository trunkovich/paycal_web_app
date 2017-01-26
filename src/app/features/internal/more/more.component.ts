import { Component } from '@angular/core';
import {Store} from '@ngrx/store';

import {LogoutAction} from '../../../STATE/actions/auth.actions';
import {AppState} from '../../../STATE/reducers/index';

@Component({
  selector: 'pcl-more',
  templateUrl: './more.component.html',
  styleUrls: ['./more.component.scss']
})
export class MoreComponent {

  constructor(private store: Store<AppState>) { }

  onLogoutClick() {
    this.store.dispatch(new LogoutAction());
  }

}
