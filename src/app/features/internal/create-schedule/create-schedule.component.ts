import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'pcl-create-schedule',
  templateUrl: './create-schedule.component.html',
  styleUrls: ['./create-schedule.component.scss']
})
export class CreateScheduleComponent implements OnInit, OnDestroy, AfterViewInit {
  scheduleMonth = moment().add(5, 'month');
  deadline = moment().startOf('month').date(15);
  introductionShown = false;
  selectedIndex = 0;

  @ViewChild('step') step;

  constructor(private router: Router) { }

  ngOnInit() {

  }

  ngOnDestroy() {

  }

  ngAfterViewInit() {
    console.log(this.step);
  }

  back() {
    this.router.navigate(['/', 'profile']);
  }

  start() {
    this.introductionShown = true;
  }

  selectionChange(data) {
    this.selectedIndex = data.selectedIndex;
    console.log(this.step);
  }

}
