import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';

import {APP_CONFIG} from '../../../../environments/environment';

@Component({
  selector: 'pcl-complete-registration-success',
  templateUrl: './complete-registration-success.component.html',
  styleUrls: ['./complete-registration-success.component.scss']
})
export class CompleteRegistrationSuccessComponent implements OnInit, OnDestroy {
  timeoutId;

  constructor(private router: Router) { }

  ngOnInit() {
    this.timeoutId = setTimeout(() => this.router.navigateByUrl(APP_CONFIG.DEFAULT_REDIRECT_URL), APP_CONFIG.AUTO_REDIRECT_TIMER);
  }

  ngOnDestroy() {
    clearTimeout(this.timeoutId);
  }

}
