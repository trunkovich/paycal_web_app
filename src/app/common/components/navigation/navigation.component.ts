import { Component } from '@angular/core';
import {Observable} from 'rxjs';
import {AppState, profileSelectors} from '../../../STATE/reducers/index';
import {Store} from '@ngrx/store';

@Component({
  selector: 'pcl-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  isHomeDisabled$: Observable<boolean>;

  constructor(private store: Store<AppState>) {
    this.isHomeDisabled$ = store.select(profileSelectors.getMyProfile)
      .map((profile) => !profile || !profile.ScheduledPersonID);
  }

  openContactUsDialog() {
    console.log('contact us clicked');
  }

}
