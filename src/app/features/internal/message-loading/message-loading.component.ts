import {Component, OnInit, OnDestroy} from '@angular/core';
import {APP_CONFIG} from '../../../../environments/environment';
import {INTERNAL_ROUTES} from '../internal.routes';
import {Router} from '@angular/router';

@Component({
  selector: 'pcl-message-loading',
  templateUrl: './message-loading.component.html',
  styleUrls: ['./message-loading.component.scss']
})
export class MessageLoadingComponent implements OnInit, OnDestroy {
  timeoutId;

  constructor(private router: Router) { }

  ngOnInit() {
    this.timeoutId = setTimeout(() => this.router.navigate(['/', INTERNAL_ROUTES.HOME]), APP_CONFIG.AUTO_REDIRECT_TIMER * 10);
  }

  ngOnDestroy() {
    clearTimeout(this.timeoutId);
  }


}
