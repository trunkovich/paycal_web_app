import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';

import {APP_CONFIG} from '../../../../environments/environment';
import {INTERNAL_ROUTES} from '../internal.routes';

@Component({
  selector: 'pcl-message-success',
  templateUrl: './message-success.component.html',
  styleUrls: ['./message-success.component.scss']
})
export class MessageSuccessComponent implements OnInit, OnDestroy {
  timeoutId;

  constructor(private router: Router) { }

  ngOnInit() {
    this.timeoutId = setTimeout(() => this.router.navigate(['/', INTERNAL_ROUTES.HOME]), APP_CONFIG.AUTO_REDIRECT_TIMER);
  }

  ngOnDestroy() {
    clearTimeout(this.timeoutId);
  }

}
