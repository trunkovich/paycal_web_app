/**
 * Created by TrUnK on 15.01.2017.
 */

import * as MobileDetect from 'mobile-detect';
import {Observable} from 'rxjs';

let md = new MobileDetect(window.navigator.userAgent);
export const isMobile = !!md.phone();

// let obs = Observable.fromEvent(window, 'orientationchange');
// obs.subscribe(res => console.log(res));
