import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { APP_CONFIG } from '../../../../environments/environment';

@Component({
  selector: 'pcl-crop-loading',
  templateUrl: './crop-loading.component.html',
  styleUrls: ['./crop-loading.component.scss']
})
export class CropLoadingComponent implements OnInit, OnDestroy {
  timeoutId;

  constructor(private router: Router) { }

  ngOnInit() {
    this.timeoutId = setTimeout(() => this.router.navigate(['/', 'profile']), APP_CONFIG.AUTO_REDIRECT_TIMER * 10);
  }

  ngOnDestroy() {
    clearTimeout(this.timeoutId);
  }
}
