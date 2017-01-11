import {Component, Input, Output, EventEmitter} from '@angular/core';
import {MdIconRegistry} from "@angular/material";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'pcl-button',
  template: `
<button [type]="type || 'button'" [disabled]="disabled || loading" [class.loading]="loading" (click)="onClick($event);">
  <span *ngIf="!loading">{{title}}</span>
  <span *ngIf="loading" class="spinner">
    <md-icon svgIcon="reload"></md-icon>
  </span>
</button>
  `,
  styleUrls: ['./pcl-button.component.scss']
})
export class PclButtonComponent {
  @Input() title: string;
  @Input() disabled: boolean;
  @Input() loading: boolean;
  @Input() type: string;
  @Output() buttonClick = new EventEmitter();

  constructor(mdIconRegistry: MdIconRegistry, sanitizer: DomSanitizer) {
    mdIconRegistry.addSvgIcon(
      'reload',
      sanitizer.bypassSecurityTrustResourceUrl('assets/svg/reload.svg')
      );
  }

  onClick($event: MouseEvent) {
    if (!this.disabled && !this.loading) {
      this.buttonClick.emit($event);
    }
    $event.stopPropagation();
  }

}
