import {Component, Inject, forwardRef} from '@angular/core';
import {BottomSheetService} from '../bottom-sheet.service';

@Component({
  selector: 'pcl-bottom-sheet-container',
  templateUrl: './bottom-sheet-container.component.html',
  styleUrls: ['./bottom-sheet-container.component.scss']
})
export class BottomSheetContainerComponent {

  constructor(@Inject(forwardRef(() => BottomSheetService)) public bss: BottomSheetService) { }

  close(result) {
    this.bss.close(result);
  }

}
