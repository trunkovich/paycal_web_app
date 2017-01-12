import { Component } from '@angular/core';
import {PaycalHttpInterceptor} from "./core/services/http-interceptor.service";

@Component({
  selector: 'app-root',
  template: `
  <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
  title = 'app works!';

  constructor(private paycalHttpInterceptor: PaycalHttpInterceptor) {
    paycalHttpInterceptor.initInterceptors();
  }
}
