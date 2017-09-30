import { Component, OnInit } from '@angular/core';

import { isMobile } from '../../../core/check-mobile';

@Component({
  selector: 'pcl-registration-success',
  templateUrl: './registration-success.component.html',
  styleUrls: ['./registration-success.component.scss']
})
export class RegistrationSuccessComponent implements OnInit {
  isMobile: boolean = true;

  constructor() { }

  ngOnInit() {
    this.isMobile = isMobile;
  }

}
