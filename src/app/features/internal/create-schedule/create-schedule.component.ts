import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'pcl-create-schedule',
  templateUrl: './create-schedule.component.html',
  styleUrls: ['./create-schedule.component.scss']
})
export class CreateScheduleComponent implements OnInit, OnDestroy {
  scheduleMonth = moment().add(5, 'month');
  deadline = moment().startOf('month').date(15);
  introductionShown = false;

  constructor(private router: Router) { }

  ngOnInit() {

  }

  ngOnDestroy() {

  }

  back() {
    this.router.navigate(['/', 'profile']);
  }

  start() {
    this.introductionShown = true;
  }


}
