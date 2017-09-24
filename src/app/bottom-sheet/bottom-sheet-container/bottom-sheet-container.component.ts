import { Component } from '@angular/core';

@Component({
  selector: 'pcl-bottom-sheet-container',
  templateUrl: './bottom-sheet-container.component.html',
  styleUrls: ['./bottom-sheet-container.component.scss']
})
export class BottomSheetContainerComponent {

  constructor() { }

  close(result) {
    // This function is replaced here:
    // bottom-sheet.service.ts:26
  }

}
