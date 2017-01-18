import { Component } from '@angular/core';
import {Store} from '@ngrx/store';

import {AppState} from '../../../STATE/models/app-state.model';
import {LogoutAction} from '../../../STATE/actions/auth.actions';

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
