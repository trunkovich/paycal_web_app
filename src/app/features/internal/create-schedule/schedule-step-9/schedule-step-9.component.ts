import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'pcl-schedule-step-9',
  templateUrl: './schedule-step-9.component.html',
  styleUrls: ['./schedule-step-9.component.scss']
})
export class ScheduleStep9Component {
  @Input() details: string;
  @Output() onUpdate = new EventEmitter<boolean>();

  constructor() { }

}
