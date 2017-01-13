import { NgModule } from '@angular/core';
import {PclButtonComponent} from "./components/pcl-button/pcl-button.component";
import {CommonModule} from "@angular/common";
import {MaterialModule} from "@angular/material";
import { PclHeaderComponent } from './components/pcl-header/pcl-header.component';

@NgModule({
    imports: [
      CommonModule,
      MaterialModule
    ],
    exports: [PclButtonComponent, PclHeaderComponent],
    declarations: [PclButtonComponent, PclHeaderComponent],
    providers: [],
})
export class PclCommonModule { }
