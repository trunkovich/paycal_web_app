import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import {APP_CONFIG} from '../../../../environments/environment';

@Component({
  selector: 'pcl-registration-step2-success',
  templateUrl: './registration-step2-success.component.html',
  styleUrls: ['./registration-step2-success.component.scss']
})
export class RegistrationStep2SuccessComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    setTimeout(() => this.router.navigateByUrl(APP_CONFIG.DEFAULT_REDIRECT_URL), APP_CONFIG.AUTO_REDIRECT_TIMER);
  }

}
