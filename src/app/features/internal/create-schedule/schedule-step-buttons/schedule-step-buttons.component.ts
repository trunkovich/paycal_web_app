import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'pcl-schedule-step-buttons',
  templateUrl: './schedule-step-buttons.component.html',
  styleUrls: ['./schedule-step-buttons.component.scss']
})
export class ScheduleStepButtonsComponent {
  @Input() showSkipBtn: boolean;
  @Input() disableSkipBtn: boolean;
  @Input() disableNextBtn: boolean;
  @Input() showAddBtn: boolean;
  @Input() addBtnTitle: boolean;

  @Output() onSkipBtnClick = new EventEmitter();
  @Output() onNextBtnClick = new EventEmitter();
  @Output() onAddBtnClick = new EventEmitter();
}
