import { Component, Input } from '@angular/core';

import { Employee } from '../../../../STATE/models/employee.model';

@Component({
  selector: 'pcl-search-results-entry',
  template: `
<div class="provider-entry" *ngIf="entry.FirstName">
  <div class="title">
    {{(entry.LastName || '') + ' ' + (entry.FirstName || '')}}
  </div>
</div>
<div class="entry" *ngIf="!entry.FirstName">{{entry}}</div>
`
})
export class SearchResultsEntryComponent {
  @Input() entry: Employee;
}
