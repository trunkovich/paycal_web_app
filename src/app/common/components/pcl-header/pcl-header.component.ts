import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'pcl-header',
  template: `
<header>
  <button *ngIf="showBackBtn" 
          md-ripple
          mdRippleCentered="true"
          type="button" 
          class="icon-button back-button" 
          (click)="onBackBtnClick($event)">
    <div class="back-icon"></div>
  </button>
  <div class="title">{{title}}</div>
  <button *ngIf="showNextBtn" 
          md-ripple
          mdRippleCentered="true"
          type="button" 
          class="next-button" 
          [disabled]="disabledNextBtn"
          (click)="onNextBtnClick($event)">
    NEXT
  </button>
</header>
  `,
  styleUrls: ['./pcl-header.component.scss']
})
export class PclHeaderComponent implements OnInit {
  @Input() showBackBtn: boolean;
  @Input() showNextBtn: boolean;
  @Input() disabledNextBtn: boolean;
  @Input() title: boolean;
  @Output() backBtnClick = new EventEmitter();
  @Output() nextBtnClick = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onBackBtnClick($event: MouseEvent) {
    this.backBtnClick.emit($event);
  }

  onNextBtnClick($event: MouseEvent) {
    this.nextBtnClick.emit($event);
  }
}
