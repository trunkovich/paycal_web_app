import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'pcl-schedule-step-9',
  templateUrl: './schedule-step-9.component.html',
  styleUrls: ['./schedule-step-9.component.scss']
})
export class ScheduleStep9Component implements OnInit, OnChanges {
  @Input() details: string;
  @Output() onUpdate = new EventEmitter<string>();
  @Output() onSkip = new EventEmitter();
  @Output() onNext = new EventEmitter();

  notesField: FormControl;

  constructor() { }

  ngOnInit() {
    this.notesField = new FormControl(this.details || '');
    this.notesField.valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(500)
      )
      .subscribe(value => this.onUpdate.emit(value as string));
  }

  ngOnChanges(changes) {
    if (changes.details && changes.details.currentValue && changes.details.previousValue === null) {
      this.notesField.setValue(changes.details.currentValue);
    }
  }

}
