import './polyfills.ts';
import 'ts-helpers';
import 'blueimp-canvas-to-blob';
import 'proxy-polyfill/proxy.min.js';
import 'intl/index';
import 'intl/locale-data/jsonp/en.js';


import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { AppModule } from './app/';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
