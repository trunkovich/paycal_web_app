import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';

import {APP_CONFIG} from '../../../../environments/environment';
import {INTERNAL_ROUTES} from '../../internal/internal.routes';

@Component({
  selector: 'pcl-change-password-success',
  templateUrl: './change-password-success.component.html',
  styleUrls: ['./change-password-success.component.scss']
})
export class ChangePasswordSuccessComponent implements OnInit, OnDestroy {
  timeoutId;

  constructor(private router: Router) { }

  ngOnInit() {
    this.timeoutId = setTimeout(() => this.router.navigate(['/', INTERNAL_ROUTES.PROFILE]), APP_CONFIG.AUTO_REDIRECT_TIMER);
  }

  ngOnDestroy() {
    clearTimeout(this.timeoutId);
  }

}
