import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';

import {APP_CONFIG} from '../../../../environments/environment';
import {INTERNAL_ROUTES} from '../internal.routes';

@Component({
  selector: 'pcl-crop-loading',
  templateUrl: './crop-loading.component.html',
  styleUrls: ['./crop-loading.component.scss']
})
export class CropLoadingComponent implements OnInit, OnDestroy {
  timeoutId;

  constructor(private router: Router) { }

  ngOnInit() {
    this.timeoutId = setTimeout(() => this.router.navigate(['/', INTERNAL_ROUTES.PROFILE]), APP_CONFIG.AUTO_REDIRECT_TIMER * 10);
  }

  ngOnDestroy() {
    clearTimeout(this.timeoutId);
  }
}
