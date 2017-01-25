import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BottomSheetContainerComponent } from './bottom-sheet-container/bottom-sheet-container.component';
import {BottomSheetService} from './bottom-sheet.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [BottomSheetService],
  declarations: [BottomSheetContainerComponent]
})
export class BottomSheetModule { }
