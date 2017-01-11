import { NgModule } from '@angular/core';
import {PclButtonComponent} from "./components/pcl-button/pcl-button.component";
import {CommonModule} from "@angular/common";
import {MaterialModule} from "@angular/material";

@NgModule({
    imports: [
      CommonModule,
      MaterialModule
    ],
    exports: [PclButtonComponent],
    declarations: [PclButtonComponent],
    providers: [],
})
export class PclCommonModule { }
