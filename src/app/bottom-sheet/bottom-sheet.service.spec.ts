/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BottomSheetService } from './bottom-sheet.service';

describe('BottomSheetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BottomSheetService]
    });
  });

  it('should ...', inject([BottomSheetService], (service: BottomSheetService) => {
    expect(service).toBeTruthy();
  }));
});
