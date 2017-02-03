import {Component, OnInit, Input, OnChanges} from '@angular/core';

@Component({
  selector: 'pcl-multiline-error-msg',
  templateUrl: './multiline-error-msg.component.html',
  styleUrls: ['./multiline-error-msg.component.scss']
})
export class MultilineErrorMsgComponent implements OnChanges{
  @Input() errorMsg: string;
  lines: string[];

  ngOnChanges() {
    if (this.errorMsg) {
      if (this.errorMsg.split('.').length) {
        this.lines = this.errorMsg.split('.');
      }
    }
  }
}
