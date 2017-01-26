import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {HttpInterceptorService, getHttpOptions} from 'ng-http-interceptor';

import {APP_CONFIG} from '../../../environments/environment';
import {Response as AppResponse} from '../../STATE/models/responses/response.model';
import {Response, URLSearchParams} from '@angular/http';
import {LogoutAction} from '../../STATE/actions/auth.actions';
import {AppState, authSelectors} from '../../STATE/reducers/index';

@Injectable()
export class PaycalHttpInterceptor {

    constructor(
      private httpInterceptor: HttpInterceptorService,
      private store: Store<AppState>
    ) {}

    initInterceptors() {
      let token = '';
      this.store.select(authSelectors.getToken)
        .subscribe((actualToken) => {
          token = actualToken;
        });

      this.httpInterceptor.request().addInterceptor((data, method) => {
        if (!PaycalHttpInterceptor.isApiUrl(data[0])) {
          return data;
        }
        let options = getHttpOptions(data, method);

        if (!options.search) {
          options.search = new URLSearchParams();
        }
        if (options.search && options.search.append) {
          options.search.append('loginToken', token);
        }
        return data;
      });

      this.httpInterceptor.response().addInterceptor((res, method) => {
        res.subscribe((response: Response) => {
          if (PaycalHttpInterceptor.isApiUrl(response.url)) {
            let body: AppResponse = response.json();
            if (!body.IsSuccess && body.ErrorCode === '403') {
              this.store.dispatch(new LogoutAction());
            }
          }
        });
        return res;
      });
    }

    static isApiUrl(url: string): boolean {
      if (url.split('//').length <= 1) {
        return false;
      }
      return url.split('//')[1].startsWith(APP_CONFIG.API_BASE_URL.split('//')[1]);
    }

}
