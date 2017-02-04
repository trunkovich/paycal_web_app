/**
 * Created by TrUnK on 04.02.2017.
 */
import {ImageDataModel} from '../../../STATE/models/image-data.model';

export class Crop {
  data: ImageDataModel;

  constructor(imageData: ImageDataModel) {
    this.data = imageData;
  }

  getImageStyles(): any {
    if (this.data) {
      return {
        'background-image': 'url(' + this.data.dataUri + ')'
      };
    } else {
      return {};
    }
  }
}
