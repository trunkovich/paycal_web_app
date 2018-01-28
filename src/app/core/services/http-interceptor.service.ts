import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse }
  from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { Store } from '@ngrx/store';
import { AppState, authSelectors } from '../../STATE/reducers/index';
import { APP_CONFIG } from '../../../environments/environment';
import { Response } from '../../STATE/models/responses/response.model';
import { LogoutAction } from '../../STATE/actions/auth.actions';

@Injectable()
export class PaycalHttpInterceptor implements HttpInterceptor {
  token: string;

  constructor(
    private store: Store<AppState>
  ) {
    this.store.select(authSelectors.getToken)
      .subscribe((actualToken) => {
        this.token = actualToken;
      });
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    if (PaycalHttpInterceptor.isApiUrl(req.url)) {
      const reqClone = req.clone({params: req.params.set('loginToken', this.token)});
      return next.handle(reqClone)
        .do(event => {
          if (event instanceof HttpResponse) {
            const response: Response = event.body;
            if (!response.IsSuccess && response.ErrorCode === '403') {
              this.store.dispatch(new LogoutAction());
            }
          }
        });
    }
    return next.handle(req);
  }

  static isApiUrl(url: string): boolean {
    if (url.split('//').length <= 1) {
      return false;
    }
    return url.split('//')[1].startsWith(APP_CONFIG.API_BASE_URL.split('//')[1]);
  }
}
