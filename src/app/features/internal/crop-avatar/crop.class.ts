/**
 * Created by TrUnK on 04.02.2017.
 */
import {ImageDataModel} from '../../../STATE/models/image-data.model';

interface Coords {
  x: number;
  y: number;
}

export class Crop {
  data: ImageDataModel;
  viewWidth: number;
  viewHeight: number;
  photoAreaWidth: number;
  photoAreaHeight: number;
  imageAspectRatio: number;
  viewAspectRatio: number;
  topLeft: Coords;

  constructor(imageData: ImageDataModel, viewWidth: number, viewHeight: number) {
    this.data = imageData;
    this.viewWidth = viewWidth;
    this.viewHeight = viewHeight;
    this.viewAspectRatio = this.viewWidth / this.viewHeight;
    this.imageAspectRatio = this.data.width / this.data.height;
    if (this.imageAspectRatio > this.viewAspectRatio) {
      this.photoAreaWidth = this.viewWidth;
      this.photoAreaHeight = this.data.height / (this.data.width / this.viewWidth);
      this.topLeft = {x: 0, y: (this.viewHeight - this.photoAreaHeight) / 2};
    } else {
      this.photoAreaHeight = this.viewHeight;
      this.photoAreaWidth = this.data.width / (this.data.height / this.viewHeight);
      this.topLeft = {y: 0, x: (this.viewWidth - this.photoAreaWidth) / 2};
    }
  }

  getImageSrc(): string {
    if (this.data) {
      return this.data.dataUri;
    } else {
      return '';
    }
  }

  getImageStyles(): any {
    if (this.data) {
      return {
        'width': this.photoAreaWidth + 'px',
        'height': this.photoAreaHeight + 'px',
        'top': this.topLeft.y + 'px',
        'left': this.topLeft.x + 'px',
      };
    } else {
      return {};
    }
  }
}
