import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BottomSheetContainerComponent } from './bottom-sheet-container/bottom-sheet-container.component';
import { BottomSheetService } from './bottom-sheet.service';
import { CustomMaterialModule } from '../custom-material.module';

@NgModule({
  imports: [
    CommonModule,

    CustomMaterialModule
  ],
  providers: [BottomSheetService],
  declarations: [BottomSheetContainerComponent]
})
export class BottomSheetModule { }
