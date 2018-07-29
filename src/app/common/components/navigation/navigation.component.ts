import { Component, HostBinding, Input, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { AppState, profileSelectors } from '../../../STATE/reducers/index';
import { BottomSheetService } from '../../../bottom-sheet/bottom-sheet.service';
import { ContactUsBottomSheetComponent } from '../../../features/internal/contact-us-bottom-sheet/contact-us-bottom-sheet.component';
import { map } from 'rxjs/operators';
import { Employee } from '../../../STATE/models/employee.model';

@Component({
  selector: 'pcl-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnChanges {
  @Input() show: boolean;
  @Input() online: boolean;
  isHomeDisabled$: Observable<boolean>;
  @HostBinding('class.show') someNav = false;

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
    this.someNav = this.show;
  }

}
