import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'pcl-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.scss']
})
export class IntroductionComponent {
  @Input() scheduleMonth: moment.Moment;
  @Input() deadline: moment.Moment;
  @Output() onStartClick = new EventEmitter();

  constructor() { }

  start() {
    this.onStartClick.emit();
  }

}
