import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { AppState, profileSelectors } from '../../../STATE/reducers/index';
import { ImageDataModel } from '../../../STATE/models/image-data.model';
import { Crop } from './crop.class';
import { UploadImageAction } from '../../../STATE/actions/profile.actions';

@Component({
  selector: 'pcl-crop-avatar',
  templateUrl: './crop-avatar.component.html',
  styleUrls: ['./crop-avatar.component.scss']
})
export class CropAvatarComponent implements OnInit, OnDestroy {
  crop: Crop;
  result: string;
  private container: HTMLElement;
  private sub: Subscription;

  @ViewChild('image') image: ElementRef;

  constructor(
    private elRef: ElementRef,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.sub = this.store.select(profileSelectors.getUploadedImageData)
      .subscribe((data: ImageDataModel) => {
        if (data) {
          this.container = <HTMLElement>this.elRef.nativeElement.getElementsByClassName('crop-container')[0];
          this.crop = new Crop(data, this.image.nativeElement);
          setTimeout(() => this.sub.unsubscribe(), 0);
        } else {
          this.router.navigate(['/', 'edit-profile']);
        }
      });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
    if (this.crop) {
      this.crop.destroy();
      this.crop = null;
    }
  }

  onBackBtnClick() {
    this.router.navigate(['/', 'edit-profile']);
  }

  save() {
    this.crop.getFile()
      .then((image: File) => {
        this.store.dispatch(new UploadImageAction(image));
      });
  }

}
