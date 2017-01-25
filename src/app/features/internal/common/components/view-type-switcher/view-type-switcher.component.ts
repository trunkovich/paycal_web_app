import {Component, Input} from '@angular/core';
import {CalendarTypes} from '../../../../../STATE/models/calendar.types';
import {ViewTypeBottomSheetComponent} from '../view-type-bottom-sheet/view-type-bottom-sheet.component';
import {BottomSheetService} from '../../../../../bottom-sheet/bottom-sheet.service';

@Component({
  selector: 'pcl-view-type-switcher',
  templateUrl: './view-type-switcher.component.html',
  styleUrls: ['./view-type-switcher.component.scss']
})
export class ViewTypeSwitcherComponent {
  @Input() type: CalendarTypes;

  constructor(private bss: BottomSheetService) { }

  isTypeSet() {
    return this.type || this.type === 0;
  }

  get formattedType() {
    return this.type === CalendarTypes.DAY ? 'DAY VIEW' : (this.type === CalendarTypes.WEEK ? 'WEEK VIEW' : '2 WEEK VIEW');
  }

  openBottomSheet() {
    this.bss.open(ViewTypeBottomSheetComponent);
  }

}
