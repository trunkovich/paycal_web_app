import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';

@Component({
  selector: 'pcl-schedule-entry-card',
  templateUrl: './schedule-entry-card.component.html',
  styleUrls: ['./schedule-entry-card.component.scss']
})
export class ScheduleEntryCardComponent implements OnInit {
  @Output() shiftClick = new EventEmitter();
  @Input() lineOne: string;
  @Input() shiftCode: string;
  @Input() lineTwo: string;
  @Input() hideButton: boolean;

  constructor() { }

  ngOnInit() {
  }

  onShiftClick($event: MouseEvent) {
    this.shiftClick.emit(event);
  }

}
