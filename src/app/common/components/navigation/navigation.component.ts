import {Component, Input, HostBinding, OnChanges} from '@angular/core';
import {Observable} from 'rxjs';
import {AppState, profileSelectors} from '../../../STATE/reducers/index';
import {Store} from '@ngrx/store';
import {BottomSheetService} from '../../../bottom-sheet/bottom-sheet.service';
import {ContactUsBottomSheetComponent} from '../../../features/internal/contact-us-bottom-sheet/contact-us-bottom-sheet.component';

@Component({
  selector: 'pcl-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnChanges {
  @Input() show: boolean;
  isHomeDisabled$: Observable<boolean>;
  @HostBinding('class.show') someNav: boolean = false;

  constructor(private store: Store<AppState>, private bss: BottomSheetService) {
    this.isHomeDisabled$ = store.select(profileSelectors.getMyProfile)
      .map((profile) => !profile || !profile.ScheduledPersonID);
  }

  openContactUsDialog() {
    this.bss.open(ContactUsBottomSheetComponent);
  }

  ngOnChanges() {
    this.someNav = this.show;
  }

}
