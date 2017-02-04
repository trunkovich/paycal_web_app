import {Component, OnInit, OnDestroy} from '@angular/core';
import {AvatarService} from '../../../core/services/avatar.service';
import {INTERNAL_ROUTES} from '../internal.routes';
import {Router} from '@angular/router';
import {AppState, profileSelectors} from '../../../STATE/reducers/index';
import {Store} from '@ngrx/store';
import {Subscription, Observable} from 'rxjs';

@Component({
  selector: 'pcl-crop-avatar',
  templateUrl: './crop-avatar.component.html',
  styleUrls: ['./crop-avatar.component.scss']
})
export class CropAvatarComponent implements OnInit, OnDestroy {
  dataUri: string;
  private sub: Subscription;

  constructor(private avatarService: AvatarService, private router: Router, private store: Store<AppState>) {

  }

  ngOnInit() {
    this.sub = this.store.select(profileSelectors.getUploadedImageData)
      .subscribe((dataUri) => {
        console.log(dataUri);
        if (dataUri) {
          this.dataUri = dataUri;
          setTimeout(() => this.sub.unsubscribe(), 0);
        } else {
          this.router.navigate(['/', INTERNAL_ROUTES.EDIT_PROFILE]);
        }
      });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  getImageStyles(): any {
    if (this.dataUri) {
      return {
        'background-image': 'url(' + this.dataUri + ')'
      };
    } else {
      return {};
    }
  }

}
