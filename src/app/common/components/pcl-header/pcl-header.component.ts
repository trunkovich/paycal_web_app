import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'pcl-header',
  template: `
<header>
  <button *ngIf="showBackBtn" type="button" class="icon-button back-button" (click)="onClick($event)">
    <div class="back-icon"></div>
  </button>
  <div class="title">{{title}}</div>
</header>
  `,
  styleUrls: ['./pcl-header.component.scss']
})
export class PclHeaderComponent implements OnInit {
  @Input() showBackBtn: boolean;
  @Input() title: boolean;
  @Output() backBtnClick = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onClick($event: MouseEvent) {
    this.backBtnClick.emit($event);
  }
}
