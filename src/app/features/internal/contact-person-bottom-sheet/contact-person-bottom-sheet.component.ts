import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import { Employee } from '../../../STATE/models/employee.model';
import { AppState, searchSelectors } from '../../../STATE/reducers/index';
import { BottomSheetService } from '../../../bottom-sheet/bottom-sheet.service';

@Component({
  selector: 'pcl-contact-person-bottom-sheet',
  templateUrl: './contact-person-bottom-sheet.component.html',
  styleUrls: ['./contact-person-bottom-sheet.component.scss']
})
export class ContactPersonBottomSheetComponent implements OnInit, OnDestroy {
  extra: {schedulePersonId: number};
  person: Employee;

  sub: Subscription;

  constructor(private bss: BottomSheetService, private store: Store<AppState>) {}

  ngOnInit() {
    if (!this.extra || !this.extra.schedulePersonId) {
      this.bss.close(false);
    } else {
      this.sub = this.store.select(searchSelectors.getEmployeeFromGroupBySchedulePersonId(this.extra.schedulePersonId))
        .subscribe((person) => {
          this.person = person;
        });
    }
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  close(result) {
    this.bss.close(result);
  }
}
