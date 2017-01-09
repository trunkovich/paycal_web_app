import {Injectable} from '@angular/core';
import {HttpInterceptorService, getHttpOptions} from "ng-http-interceptor";
import {AppState} from "../../STATE/models/app-state.model";
import {Store} from "@ngrx/store";

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
          console.log('token updated');
          token = actualToken;
        });

      this.httpInterceptor.request().addInterceptor((data, method) => {
        let options = getHttpOptions(data, method);
        options.search.append('loginToken', token);
        return data;
      });

      this.httpInterceptor.response().addInterceptor((res, method) => {
        // res.subscribe(r => console.log(method, r));
        return res;
      });
    }

}
