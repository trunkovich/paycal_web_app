import {Component, Input} from '@angular/core';

@Component({
  selector: 'pcl-master-schedule-card',
  templateUrl: './master-schedule-card.component.html',
  styleUrls: ['./master-schedule-card.component.scss']
})
export class MasterScheduleCardComponent {
  @Input() lineOne: string;
  @Input() shiftCode: string;
  @Input() lineTwo: string;
}
