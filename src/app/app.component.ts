import { Component } from '@angular/core';
import { PaycalHttpInterceptor } from './core/services/http-interceptor.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MdIconRegistry } from '@angular/material';

@Component({
  selector: 'pcl-root',
  template: `
  <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
  title = 'app works!';

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
