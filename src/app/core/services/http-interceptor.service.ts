import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {HttpInterceptorService, getHttpOptions} from 'ng-http-interceptor';

import {AppState} from '../../STATE/models/app-state.model';
import {APP_CONFIG} from '../../../environments/environment';
import {Response as AppResponse} from '../../STATE/models/responses/response.model';
import {Response} from '@angular/http';
import {LogoutAction} from '../../STATE/actions/auth.actions';

@Injectable()
export class PaycalHttpInterceptor {

    constructor(
      private httpInterceptor: HttpInterceptorService,
      private store: Store<AppState>
    ) {}

    initInterceptors() {
      let token = '';
      this.store.select(state => state.auth.token)
        .subscribe((actualToken) => {
          token = actualToken;
        });

      this.httpInterceptor.request().addInterceptor((data, method) => {
        if (!PaycalHttpInterceptor.isApiUrl(data[0])) {
          return data;
        }
        let options = getHttpOptions(data, method);

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
      return url.indexOf(APP_CONFIG.API_BASE_URL) > -1;
    }

}
