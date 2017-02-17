import {Component, OnChanges, Input} from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'pcl-shift-code',
  templateUrl: './shift-code.component.html',
  styleUrls: ['./shift-code.component.scss']
})
export class ShiftCodeComponent implements OnChanges {
  @Input() code: string;
  letters: string[];

  ngOnChanges(changes: any) {
    if (changes && changes.code && changes.code.currentValue && changes.code.currentValue) {
      this.letters = _.split(changes.code.currentValue, '');
    }
  }
}
