/**
 * Created by TrUnK on 04.02.2017.
 */
import * as Cropper from 'cropperjs';

import {ImageDataModel} from '../../../STATE/models/image-data.model';
import {blobToFile} from '../../../STATE/utils';

export class Crop {
  data: ImageDataModel;
  cropper: Cropper;

  constructor(imageData: ImageDataModel, image: HTMLImageElement) {
    this.data = imageData;
    setTimeout(() => this.enableCropper(image), 0);
  }

  destroy(): void {
    this.cropper.destroy();
    this.cropper = null;
    this.data = null;
  }

  enableCropper(image: HTMLImageElement): void {
    this.cropper = new Cropper(image, {
      aspectRatio: 1,
      viewMode: 2,
      dragMode: 'move',
      guides: false,
      center: false
    });
  }

  getFile(): Promise<File> {
    return new Promise((resolve) => {
      this.cropper.getCroppedCanvas({
        width: 270,
        height: 270
      }).toBlob(result => {
        resolve(blobToFile(result, this.data.name));
      }, this.data.type, 1);
    });
  }

  getImageSrc(): string {
    if (this.data) {
      return this.data.dataUri;
    } else {
      return '';
    }
  }
}
