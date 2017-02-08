import {Component, OnInit, OnDestroy, ElementRef, ViewChild} from '@angular/core';
import {INTERNAL_ROUTES} from '../internal.routes';
import {Router} from '@angular/router';
import {AppState, profileSelectors} from '../../../STATE/reducers/index';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
import {ImageDataModel} from '../../../STATE/models/image-data.model';
import {Crop} from './crop.class';
import {UploadImageAction} from '../../../STATE/actions/profile.actions';

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
          this.router.navigate(['/', INTERNAL_ROUTES.EDIT_PROFILE]);
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
    this.router.navigate(['/', INTERNAL_ROUTES.EDIT_PROFILE]);
  }

  save() {
    this.crop.getFile()
      .then((image: File) => {
        this.store.dispatch(new UploadImageAction(image));
      });
  }

}
