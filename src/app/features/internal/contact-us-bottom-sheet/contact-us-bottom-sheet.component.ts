import { Component } from '@angular/core';
import {BottomSheetService} from '../../../bottom-sheet/bottom-sheet.service';
import {APP_CONFIG} from '../../../../environments/environment';


@Component({
  selector: 'pcl-contact-us-bottom-sheet',
  templateUrl: './contact-us-bottom-sheet.component.html',
  styleUrls: ['./contact-us-bottom-sheet.component.scss']
})
export class ContactUsBottomSheetComponent {
  email = APP_CONFIG.EMAIL;
  phone = APP_CONFIG.PHONE;

  constructor(private bss: BottomSheetService) {

  }

  close(result) {
    this.bss.close(result);
  }

}
