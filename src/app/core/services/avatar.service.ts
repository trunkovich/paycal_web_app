/**
 * Created by TrUnK on 04.02.2017.
 */
import {Injectable, NgZone} from '@angular/core';
import * as _ from 'lodash';
import {ImageDataModel} from '../../STATE/models/image-data.model';
import {Observable, Subject} from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AvatarService {
  private ALLOWED_TYPES = ['image/gif', 'image/jpeg', 'image/pjpeg', 'image/png'];

  constructor(private zone: NgZone) { }

  extractFile(event: EventTarget): File {
    let eventObj: MSInputMethodContext = <MSInputMethodContext> event;
    let target: HTMLInputElement = <HTMLInputElement> eventObj.target;
    let files: FileList = target.files;
    return files[0];
  }

  isImage(file: File): boolean {
    return _.includes(this.ALLOWED_TYPES, file.type);
  }

  readImage(dataUri: string): Observable<HTMLImageElement> {
    let subj = new Subject<HTMLImageElement>();
    let img = new Image();
    img.onload = () => {
      this.zone.run(() => {
        subj.next(img);
        subj.complete();
      });
    };
    img.onerror = (error) => {
      this.zone.run(() => {
        subj.error(error);
        subj.complete();
      });
    };
    img.src = dataUri;
    return subj.asObservable();
  }

  readFile(file: File): Observable<string> {
    let subj = new Subject<string>();
    let reader = new FileReader();
    reader.onload = (e: any) => {
      this.zone.run(() => {
        subj.next(e.target.result);
        subj.complete();
      });
    };
    reader.onerror = (error) => {
      this.zone.run(() => {
        subj.error(error);
        subj.complete();
      });
    };
    reader.readAsDataURL(file);
    return subj.asObservable();
  }

  getDataFromFile(file: File): Observable<ImageDataModel> {
    return this.readFile(file)
      .switchMap((dataUri) => {
        return this.readImage(dataUri)
          .pipe(
            map(img => ({dataUri: dataUri, width: img.width, height: img.height}))
          );
      });
  }
}
