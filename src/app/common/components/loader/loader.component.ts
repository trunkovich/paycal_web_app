import {Component, Input, HostBinding, OnChanges} from '@angular/core';

@Component({
  selector: 'pcl-loader',
  template: `
<div class="container">
  <section>
    <span class="spinner">
      <md-icon svgIcon="reload"></md-icon>
    </span>
  </section>
</div>
  `,
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnChanges {
  @Input() show: boolean;
  @HostBinding('class.show') showLoading: boolean = false;

  constructor() {}

  ngOnChanges() {
    this.showLoading = this.show;
  }
}
