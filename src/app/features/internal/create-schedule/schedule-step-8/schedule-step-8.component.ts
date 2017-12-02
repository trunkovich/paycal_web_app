import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'pcl-schedule-step-8',
  templateUrl: './schedule-step-8.component.html',
  styleUrls: ['./schedule-step-8.component.scss']
})
export class ScheduleStep8Component {
  @Input() compTime: boolean;
  @Input() disableNextBtn: boolean;
  @Output() onUpdate = new EventEmitter<boolean>();
  @Output() onNextBtnClick = new EventEmitter();

  constructor() { }

  onCompTimeChange($event) {
    this.onUpdate.emit($event.value);
  }
}
