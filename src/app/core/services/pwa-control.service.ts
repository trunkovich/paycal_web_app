import { Injectable, NgZone } from '@angular/core';
import { WindowWrapper } from '../../STATE/utils';
import { BROWSERS, DeviceDetectorService, OS } from 'ngx-device-detector';
import { BehaviorSubject } from 'rxjs';
import * as compareVersions from 'compare-versions';
import { MatDialog } from '@angular/material';
import { PwaAndroidDialogComponent } from '../components/pwa-android-dialog/pwa-android-dialog.component';
import { parseIOSVersion } from '../utils/utils';
import { Location } from '@angular/common';

export interface BeforeInstallEvent extends Event {
  prompt: () => void;
}

@Injectable({
  providedIn: 'root'
})
export class PwaControlService {
  beforeinstallprompt: BeforeInstallEvent;
  showAddButton$ = new BehaviorSubject<boolean>(false);
  isPwa$ = new BehaviorSubject<boolean>(false);
  dialogShown = false;
  dontShowAgain: boolean;
  showLater: boolean;
  showIosDialog$ = new BehaviorSubject<boolean>(false);

  constructor(
    private device: DeviceDetectorService,
    private zone: NgZone,
    private window: WindowWrapper,
    private dialog: MatDialog
  ) {
    try {
      this.dontShowAgain = !!localStorage.getItem('pc_dont_show_pwa_dialog');
    } catch (e) {}
  }

  init() {
    if (window.matchMedia('(display-mode: standalone)').matches) {
      alert('it\'s PWA!');
      this.isPwa$.next(true);
    } else {
      if (this.device.isMobile() && this.device.os === OS.ANDROID) {
        this.window.addEventListener('beforeinstallprompt', (event: BeforeInstallEvent) => this.zone.run(() => {
          this.showAddButton$.next(true);
          this.beforeinstallprompt = event;
          if (this.showLater) {
            this.showAndroidDialog();
          }
        }));
      }
    }
  }

  showPwaDialogIfNeeded() {
    if (this.dontShowAgain || this.dialogShown || !location.protocol.startsWith('https')) {
      return;
    }
    if (this.device.os === OS.ANDROID) {
      this.showAndroidDialog();
    } else if (this.device.os === OS.IOS || this.device.os === OS.MAC) {
      let version;
      if (version && version !== 'unknown') {
        version = this.device.os_version
      } else {
        version = parseIOSVersion(this.device.ua);
      }
      if (compareVersions(version, '11.3') > -1) {
        this.showIosDialog();
      }
    }
  }

  showPrompt() {
    if (this.beforeinstallprompt && this.beforeinstallprompt.prompt) {
      this.beforeinstallprompt.prompt();
    }
  }

  showAndroidDialog() {
    if (this.beforeinstallprompt) {
      const dialogRef = this.dialog.open(PwaAndroidDialogComponent, {
        data: {
          beforeinstallprompt: this.beforeinstallprompt
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result === 'yes') {
          // this.showPrompt();
        } else {
          this.dialogShown = true;
        }
        if (result === 'dont show again') {
          this.dontShowAgain = true;
          localStorage.setItem('pc_dont_show_pwa_dialog', 'true');
        }
      });
    } else {
      this.showLater = true;
    }

  }

  showIosDialog() {
    this.showIosDialog$.next(true);
    setTimeout(() => {
      this.showIosDialog$.next(false);
    }, 30000);
  }

  hideIosDialog() {
    this.showIosDialog$.next(false);
  }

}
