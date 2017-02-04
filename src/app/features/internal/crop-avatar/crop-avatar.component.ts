import {Component, OnInit, OnDestroy, ElementRef} from '@angular/core';
import {AvatarService} from '../../../core/services/avatar.service';
import {INTERNAL_ROUTES} from '../internal.routes';
import {Router} from '@angular/router';
import {AppState, profileSelectors} from '../../../STATE/reducers/index';
import {Store} from '@ngrx/store';
import {Subscription, Observable} from 'rxjs';
import {ImageDataModel} from '../../../STATE/models/image-data.model';
import {Crop} from './crop.class';
import {Location} from '@angular/common';

@Component({
  selector: 'pcl-crop-avatar',
  templateUrl: './crop-avatar.component.html',
  styleUrls: ['./crop-avatar.component.scss']
})
export class CropAvatarComponent implements OnInit, OnDestroy {
  crop: Crop;
  private container: HTMLElement;
  private sub: Subscription;

  constructor(
    private location: Location,
    private elRef: ElementRef,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.sub = this.store.select(profileSelectors.getUploadedImageData)
      .subscribe((data: ImageDataModel) => {
        if (data) {
          this.container = <HTMLElement>this.elRef.nativeElement.getElementsByClassName('crop-container')[0];
          this.crop = new Crop(data, this.container.offsetWidth, this.container.offsetHeight);
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

  onBackBtnClick() {
    this.location.back();
  }

  save() {
    console.log('save clicked');
  }

}
