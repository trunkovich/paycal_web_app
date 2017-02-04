import {Component, OnInit, OnDestroy} from '@angular/core';
import {AvatarService} from '../../../core/services/avatar.service';
import {INTERNAL_ROUTES} from '../internal.routes';
import {Router} from '@angular/router';
import {AppState, profileSelectors} from '../../../STATE/reducers/index';
import {Store} from '@ngrx/store';
import {Subscription, Observable} from 'rxjs';
import {ImageDataModel} from '../../../STATE/models/image-data.model';
import {Crop} from './crop.class';

@Component({
  selector: 'pcl-crop-avatar',
  templateUrl: './crop-avatar.component.html',
  styleUrls: ['./crop-avatar.component.scss']
})
export class CropAvatarComponent implements OnInit, OnDestroy {
  crop: Crop;
  private sub: Subscription;

  constructor(private avatarService: AvatarService, private router: Router, private store: Store<AppState>) {}

  ngOnInit() {
    this.sub = this.store.select(profileSelectors.getUploadedImageData)
      .subscribe((data: ImageDataModel) => {
        if (data) {
          this.crop = new Crop(data)
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



}
