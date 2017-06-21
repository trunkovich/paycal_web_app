import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'pcl-master-schedule-card',
  templateUrl: './master-schedule-card.component.html',
  styleUrls: ['./master-schedule-card.component.scss']
})
export class MasterScheduleCardComponent {
  @Input() lineOne: string;
  @Input() shiftCode: string;
  @Input() lineTwo: string;
  @Input() isPerson: boolean;
  @Output() onContactPersonClick = new EventEmitter();

  openContactDialog() {
    this.onContactPersonClick.emit();
  }
}
