import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import {AUTH_ROUTES} from '../auth.routes';
import {APP_CONFIG} from '../../../../environments/environment';

@Component({
  selector: 'pcl-password-reset-success',
  templateUrl: './password-reset-success.component.html',
  styleUrls: ['./password-reset-success.component.scss']
})
export class PasswordResetSuccessComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    setTimeout(() => this.router.navigate(['/', AUTH_ROUTES.LOGIN]), APP_CONFIG.AUTO_REDIRECT_TIMER);
  }

}
