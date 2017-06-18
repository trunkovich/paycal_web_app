import { Component } from '@angular/core';
import { PaycalHttpInterceptor } from './core/services/http-interceptor.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MdIconRegistry } from '@angular/material';
import { animate, group, query, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'pcl-root',
  template: `
    <div style="position: relative; height: 100%;" [@routerAnimations]="prepareRouteTransition(outlet)">
      <router-outlet #outlet="outlet"></router-outlet>
    </div>
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
  title = 'app works!';

  prepareRouteTransition(outlet) {
    const animation = outlet.activatedRouteData['animation'] || {};
    return animation['value'] || null;
  }

  constructor(private paycalHttpInterceptor: PaycalHttpInterceptor, mdIconRegistry: MdIconRegistry, sanitizer: DomSanitizer) {
    paycalHttpInterceptor.initInterceptors();
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

  }
}
