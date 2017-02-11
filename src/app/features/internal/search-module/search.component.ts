import { Component } from '@angular/core';

@Component({
  selector: 'pcl-search',
  template: `
<pcl-header title="Search"></pcl-header>

<div class="button-container">
  <div class="button-wrapper">
    <div class="button" [routerLink]="['/', 'search', 'call-reference']">Call Reference</div>
  </div>
  <div class="button-wrapper">
    <div class="button" [routerLink]="['/', 'search', 'or-reference']">OR Reference</div>
  </div>
  <div class="button-wrapper">
    <div class="button" [routerLink]="['/', 'search', 'physicians']">Physicians</div>
  </div>
</div>
`,
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {}
