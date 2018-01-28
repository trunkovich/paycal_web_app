import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'pcl-button',
  template: `
<button [type]="type || 'button'" [disabled]="disabled || loading" [class.loading]="loading" (click)="onClick($event);">
  <span *ngIf="!loading">{{title}}</span>
  <span *ngIf="loading" class="spinner">
    <mat-icon svgIcon="reload"></mat-icon>
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

  constructor() {}

  onClick($event: MouseEvent) {
    if (!this.disabled && !this.loading) {
      this.buttonClick.emit($event);
    }
    $event.stopPropagation();
  }

}
