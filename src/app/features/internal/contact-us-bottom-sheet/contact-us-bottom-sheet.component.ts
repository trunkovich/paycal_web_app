import {Component} from '@angular/core';
import {BottomSheetService} from '../../../bottom-sheet/bottom-sheet.service';
import {APP_CONFIG} from '../../../../environments/environment';
import {AppState} from '../../../STATE/reducers/index';
import {Store} from '@ngrx/store';
import {TrackEmailUsClickedAction, TrackCallUsClickedAction} from '../../../STATE/actions/mixpanel.actions';


@Component({
  selector: 'pcl-contact-us-bottom-sheet',
  templateUrl: './contact-us-bottom-sheet.component.html',
  styleUrls: ['./contact-us-bottom-sheet.component.scss']
})
export class ContactUsBottomSheetComponent {
  email = APP_CONFIG.EMAIL;
  phone = APP_CONFIG.PHONE;

  constructor(private bss: BottomSheetService, private store: Store<AppState>) {

  }

  close(result) {
    this.bss.close(result);
  }

  onCallClick() {
    this.store.dispatch(new TrackCallUsClickedAction());
  }

  onEmailClick() {
    this.store.dispatch(new TrackEmailUsClickedAction());
  }

}
