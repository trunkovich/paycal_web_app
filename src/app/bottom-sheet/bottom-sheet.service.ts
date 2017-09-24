import { ApplicationRef, ComponentFactoryResolver, ComponentRef, Injectable, Injector } from '@angular/core';
import { BottomSheetContainerComponent } from './bottom-sheet-container/bottom-sheet-container.component';
import { Subject } from 'rxjs';
import * as _ from 'lodash';

@Injectable()
export class BottomSheetService {
  _afterClose: Subject<any>;
  bSheetCmpt: ComponentRef<BottomSheetContainerComponent>;

  constructor(
    private _appRef: ApplicationRef,
    private _cfr: ComponentFactoryResolver,
    private _injector: Injector
  ) {
  }

  open(content: any, extra: any = {}) {
    const contentCmpFactory = this._cfr.resolveComponentFactory(content);
    const bSheetCmpFactory = this._cfr.resolveComponentFactory(BottomSheetContainerComponent);

    const contentCmpt = contentCmpFactory.create(this._injector);
    this.bSheetCmpt = bSheetCmpFactory.create(this._injector, [[contentCmpt.location.nativeElement]]);

    (contentCmpt.instance as any).extra = _.cloneDeep(extra);
    (this.bSheetCmpt.instance as any).close = (result) => this.close(result);

    document.querySelector('body').appendChild(this.bSheetCmpt.location.nativeElement);

    this._appRef.attachView(contentCmpt.hostView);
    this._appRef.attachView(this.bSheetCmpt.hostView);

    setTimeout(() => {
      this.bSheetCmpt.location.nativeElement.classList.add('active');
    }, 0);

    this.bSheetCmpt.onDestroy(() => {
      contentCmpt.destroy();
      this._appRef.detachView(this.bSheetCmpt.hostView);
      this._appRef.detachView(contentCmpt.hostView);
      this._afterClose = null;
      this.bSheetCmpt = null;
    });

    this._afterClose = new Subject();

    return this._afterClose.asObservable();
  }

  close(result) {
    this.bSheetCmpt.location.nativeElement.classList.remove('active');
    setTimeout(() => {
      this._afterClose.next(result);
      this._afterClose.complete();
      this.bSheetCmpt.destroy();
    }, 200);
  }

}
