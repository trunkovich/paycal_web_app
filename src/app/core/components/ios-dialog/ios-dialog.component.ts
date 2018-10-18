import { Component, OnDestroy, OnInit } from '@angular/core';
import { PwaControlService } from '../../services/pwa-control.service';
import { Subscription } from 'rxjs';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'pcl-ios-dialog',
  templateUrl: './ios-dialog.component.html',
  styleUrls: ['./ios-dialog.component.scss'],
  animations: [
    trigger('iosDialogAnimation', [
      state('in', style({opacity: 1})),
      transition(':enter', [
        style({opacity: 0}),
        animate(300 )
      ]),
      transition(':leave',
        animate(300, style({opacity: 0})))
    ])
  ]
})
export class IosDialogComponent implements OnInit, OnDestroy {
  showDialog: boolean;

  sub: Subscription;

  constructor(private pwa: PwaControlService) { }

  ngOnInit() {
    this.sub = this.pwa.showIosDialog$
      .subscribe(show => this.showDialog = show);
  }

  ngOnDestroy() {
    this.sub && this.sub.unsubscribe();
  }

  closeDialog(): void {
    this.pwa.hideIosDialog();
  }

}
