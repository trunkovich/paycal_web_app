import { Component, HostBinding, Input, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { AppState, profileSelectors } from '../../../STATE/reducers/index';
import { BottomSheetService } from '../../../bottom-sheet/bottom-sheet.service';
import { ContactUsBottomSheetComponent } from '../../../features/internal/contact-us-bottom-sheet/contact-us-bottom-sheet.component';
import { map } from 'rxjs/operators';
import { Employee } from '../../../STATE/models/employee.model';
import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'pcl-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  animations: [
    trigger('offlineBlock', [
      state('hide', style({
        transform: 'translate3d(0, 100px, 0)'
      })),
      state('show-above-nav',   style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('show',   style({
        transform: 'translate3d(0, 50px, 0)'
      })),
      transition('hide => show', animate('200ms ease-out')),
      transition('hide => show-above-nav', animate('200ms ease-out')),
      transition('show => show-above-nav', animate('200ms ease-out')),
      transition('show-above-nav => show', animate('200ms ease-out')),
      transition('show-above-nav => hide', [
        animate(2000, keyframes([
          style({backgroundColor: '#25252b', offset: 0}),
          style({backgroundColor: '#28a745', offset: 0.1}),
          style({backgroundColor: '#28a745', offset: 0.9}),
          style({backgroundColor: '#28a745', transform: 'translate3d(0, 100px, 0)',  offset: 1.0})
        ]))
      ]),
      transition('show => hide', [
        animate(2000, keyframes([
          style({backgroundColor: '#25252b', offset: 0}),
          style({backgroundColor: '#28a745', offset: 0.1}),
          style({backgroundColor: '#28a745', offset: 0.9}),
          style({backgroundColor: '#28a745', transform: 'translate3d(0, 100px, 0)',  offset: 1.0})
        ]))
      ])
    ])
  ]
})
export class NavigationComponent implements OnChanges {
  @Input() show: boolean;
  @Input() online: boolean;
  isHomeDisabled$: Observable<boolean>;
  showNav = false;
  offlineBlockStatus: 'hide' | 'show' | 'show-above-nav' = 'hide';

  constructor(private store: Store<AppState>, private bss: BottomSheetService) {
    this.isHomeDisabled$ = store.select(profileSelectors.getMyProfile)
      .pipe(
        map((profile: Employee) => !profile || !profile.ScheduledPersonID)
      );
  }

  openContactUsDialog() {
    this.bss.open(ContactUsBottomSheetComponent);
  }

  ngOnChanges() {
    this.showNav = this.show;
    this.offlineBlockStatus = this.online ? 'hide' : this.showNav ? 'show-above-nav' : 'show';
  }

}
