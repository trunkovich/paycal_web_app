import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { BeforeInstallEvent } from '../../services/pwa-control.service';

@Component({
  selector: 'pcl-pwa-android-dialog',
  templateUrl: './pwa-android-dialog.component.html',
  styleUrls: ['./pwa-android-dialog.component.scss']
})
export class PwaAndroidDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<PwaAndroidDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {beforeinstallprompt: BeforeInstallEvent}
  ) {}

  ngOnInit() {}

  add() {
    this.data.beforeinstallprompt.prompt();
    this.dialogRef.close('yes');
  }

}
