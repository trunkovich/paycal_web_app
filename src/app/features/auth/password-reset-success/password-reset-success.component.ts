import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { APP_CONFIG } from '../../../../environments/environment';

@Component({
  selector: 'pcl-password-reset-success',
  templateUrl: './password-reset-success.component.html',
  styleUrls: ['./password-reset-success.component.scss']
})
export class PasswordResetSuccessComponent implements OnInit, OnDestroy {
  timeoutId;

  constructor(private router: Router) { }

  ngOnInit() {
    this.timeoutId = setTimeout(() => this.router.navigate(['/', 'login']), APP_CONFIG.AUTO_REDIRECT_TIMER);
  }

  ngOnDestroy() {
    clearTimeout(this.timeoutId);
  }

}
