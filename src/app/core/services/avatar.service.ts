/**
 * Created by TrUnK on 04.02.2017.
 */
import { Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable()
export class AvatarService {
  private ALLOWED_TYPES = ['image/gif', 'image/jpeg', 'image/pjpeg', 'image/png'];

  constructor() { }

  extractFile(event: EventTarget): File {
    let eventObj: MSInputMethodContext = <MSInputMethodContext> event;
    let target: HTMLInputElement = <HTMLInputElement> eventObj.target;
    let files: FileList = target.files;
    return files[0];
  }

  isImage(file: File) {
    return _.includes(this.ALLOWED_TYPES, file.type);
  }

  readFile(file: File): Promise<any> {
    let data: any = {};
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.onload = function (e: any) {
        data.dataUri = e.target.result;
        let img = new Image();
        img.onload = function(){
          data.width = img.width;
          data.height = img.height;
          resolve(data);
        };
        img.onerror = reject;
        img.src = data.dataUri;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
}
