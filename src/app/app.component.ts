import { Component, HostBinding } from '@angular/core';
import { PaycalHttpInterceptor } from './core/services/http-interceptor.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { animate, group, query, style, transition, trigger } from '@angular/animations';
import { WindowWrapper } from './STATE/utils';
import { Network } from '@ngx-pwa/offline';
import { PwaControlService } from './core/services/pwa-control.service';

@Component({
  selector: 'pcl-root',
  template: `
    <div style="position: relative; height: 100%;" [@routerAnimations]="prepareRouteTransition(outlet)">
      <router-outlet #outlet="outlet"></router-outlet>
    </div>
    <pcl-ios-dialog></pcl-ios-dialog>
  `,
  styles: [],
  animations: [
    trigger('routerAnimations', [
      transition('login => terms', group([
        query(':enter', [
          style({ transform: 'translateX(100%)', zIndex: 2 }),
          animate(250, style({ transform: 'translateX(0)' }))
        ]),
        query(':leave', [
          style({ opacity: 1, zIndex: 1 }),
          animate(250)
        ])
      ])),
      transition('terms => login', group([
        query(':leave', [
          style({ transform: 'translateX(0%)', zIndex: 2 }),
          animate(200, style({ transform: 'translateX(100%)' }))
        ]),
        query(':enter', [
          style({ opacity: 1, zIndex: 1 }),
          animate(200)
        ])
      ])),
    ])
  ]
})
export class AppComponent {
  @HostBinding('class.narrow-device') narrowDevice = false;

  prepareRouteTransition(outlet) {
    const animation = outlet.activatedRouteData['animation'] || {};
    return animation['value'] || null;
  }

  constructor(
    mdIconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private window: WindowWrapper,
    private network: Network,
    private pwaControl: PwaControlService
  ) {
    this.pwaControl.init();
    this.network.onlineChanges
      .subscribe();
    this.narrowDevice = window.innerWidth < 375;
    mdIconRegistry.addSvgIcon(
      'reload',
      sanitizer.bypassSecurityTrustResourceUrl('assets/svg/reload.svg')
    );
    mdIconRegistry.addSvgIcon(
      'eye-outline',
      sanitizer.bypassSecurityTrustResourceUrl('assets/svg/eye-outline.svg')
    );
    mdIconRegistry.addSvgIcon(
      'eye-outline-off',
      sanitizer.bypassSecurityTrustResourceUrl('assets/svg/eye-outline-off.svg')
    );
    mdIconRegistry.addSvgIcon(
      'browser',
      sanitizer.bypassSecurityTrustResourceUrl('assets/svg/browser-icon.svg')
    );
    mdIconRegistry.addSvgIcon(
      'nav-home',
      sanitizer.bypassSecurityTrustResourceUrl('assets/svg/nav-home.svg')
    );
    mdIconRegistry.addSvgIcon(
      'nav-more',
      sanitizer.bypassSecurityTrustResourceUrl('assets/svg/nav-more.svg')
    );
    mdIconRegistry.addSvgIcon(
      'nav-contact',
      sanitizer.bypassSecurityTrustResourceUrl('assets/svg/nav-contact.svg')
    );
    mdIconRegistry.addSvgIcon(
      'nav-search',
      sanitizer.bypassSecurityTrustResourceUrl('assets/svg/nav-search.svg')
    );
    mdIconRegistry.addSvgIcon(
      'card-icon',
      sanitizer.bypassSecurityTrustResourceUrl('assets/svg/card-icon.svg')
    );
    mdIconRegistry.addSvgIcon(
      'window-close',
      sanitizer.bypassSecurityTrustResourceUrl('assets/svg/window-close.svg')
    );
    mdIconRegistry.addSvgIcon(
      'back',
      sanitizer.bypassSecurityTrustResourceUrl('assets/svg/back.svg')
    );
    mdIconRegistry.addSvgIcon(
      'profile',
      sanitizer.bypassSecurityTrustResourceUrl('assets/svg/profile.svg')
    );
    mdIconRegistry.addSvgIcon(
      'no-image',
      sanitizer.bypassSecurityTrustResourceUrl('assets/svg/no_photo.svg')
    );
    mdIconRegistry.addSvgIcon(
      'calendar-remove',
      sanitizer.bypassSecurityTrustResourceUrl('assets/svg/calendar-remove.svg')
    );
    mdIconRegistry.addSvgIcon(
      'phone',
      sanitizer.bypassSecurityTrustResourceUrl('assets/svg/phone.svg')
    );
    mdIconRegistry.addSvgIcon(
      'email',
      sanitizer.bypassSecurityTrustResourceUrl('assets/svg/email.svg')
    );
    mdIconRegistry.addSvgIcon(
      'send',
      sanitizer.bypassSecurityTrustResourceUrl('assets/svg/send.svg')
    );
    mdIconRegistry.addSvgIcon(
      'chevron-down',
      sanitizer.bypassSecurityTrustResourceUrl('assets/svg/chevron-down.svg')
    );
    mdIconRegistry.addSvgIcon(
      'chevron-up',
      sanitizer.bypassSecurityTrustResourceUrl('assets/svg/chevron-up.svg')
    );
    mdIconRegistry.addSvgIcon(
      'message-text',
      sanitizer.bypassSecurityTrustResourceUrl('assets/svg/message-text.svg')
    );
    mdIconRegistry.addSvgIcon(
      'dots-vertical',
      sanitizer.bypassSecurityTrustResourceUrl('assets/svg/dots-vertical.svg')
    );
    mdIconRegistry.addSvgIcon(
      'calendar',
      sanitizer.bypassSecurityTrustResourceUrl('assets/svg/calendar.svg')
    );
    mdIconRegistry.addSvgIcon(
      'check',
      sanitizer.bypassSecurityTrustResourceUrl('assets/svg/check.svg')
    );
    mdIconRegistry.addSvgIcon(
      'export',
      sanitizer.bypassSecurityTrustResourceUrl('assets/svg/export-variant.svg')
    );
    mdIconRegistry.addSvgIcon(
      'plus',
      sanitizer.bypassSecurityTrustResourceUrl('assets/svg/plus-box.svg')
    );

  }
}
