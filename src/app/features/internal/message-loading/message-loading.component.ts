import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { APP_CONFIG } from '../../../../environments/environment';

@Component({
  selector: 'pcl-message-loading',
  templateUrl: './message-loading.component.html',
  styleUrls: ['./message-loading.component.scss']
})
export class MessageLoadingComponent implements OnInit, OnDestroy {
  timeoutId;

  constructor(private router: Router) { }

  ngOnInit() {
    this.timeoutId = setTimeout(() => this.router.navigate(['/', 'home']), APP_CONFIG.AUTO_REDIRECT_TIMER * 10);
  }

  ngOnDestroy() {
    clearTimeout(this.timeoutId);
  }


}
