import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { BottomSheetService } from '../../../../../bottom-sheet/bottom-sheet.service';
import { CalendarTypes } from '../../../../../STATE/models/calendar.types';
import { AppState, homeSelectors, scheduleSelectors, searchSelectors } from '../../../../../STATE/reducers/index';
import { SetHomeViewTypeAction } from '../../../../../STATE/actions/home.actions';
import { SetSearchViewTypeAction } from '../../../../../STATE/actions/search.actions';
import { first } from 'rxjs/operators';

@Component({
  selector: 'pcl-view-type-bottom-sheet',
  templateUrl: './view-type-bottom-sheet.component.html',
  styleUrls: ['./view-type-bottom-sheet.component.scss']
})
export class ViewTypeBottomSheetComponent {
  type$: Observable<CalendarTypes>;
  section: string;

  constructor(private bss: BottomSheetService, private store: Store<AppState>) {
    store.select(scheduleSelectors.getCurrentSection)
      .pipe(
        first()
      )
      .subscribe((section) => {
        this.section = section;
        if (section === 'home') {
          this.type$ = store.select(homeSelectors.getHomeViewType);
        } else {
          this.type$ = store.select(searchSelectors.getViewType);
        }
      });
  }

  close(result) {
    this.bss.close(result);
  }

  select(typeStr: string) {
    let type: CalendarTypes;
    if (typeStr === 'day') {
      type = CalendarTypes.DAY;
    }
    if (typeStr === 'week') {
      type = CalendarTypes.WEEK;
    }
    if (typeStr === 'two_week') {
      type = CalendarTypes.TWO_WEEK;
    }
    if (this.section === 'home') {
      this.store.dispatch(new SetHomeViewTypeAction(type));
    } else {
      this.store.dispatch(new SetSearchViewTypeAction(type));
    }
  }

  isDayView(type: CalendarTypes) {
    return type === CalendarTypes.DAY;
  }

  isWeekView(type: CalendarTypes) {
    return type === CalendarTypes.WEEK;
  }

  isTwoWeekView(type: CalendarTypes) {
    return type === CalendarTypes.TWO_WEEK;
  }


}
