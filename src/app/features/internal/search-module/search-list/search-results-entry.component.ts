import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Employee } from '../../../../STATE/models/employee.model';

@Component({
  selector: 'pcl-search-results-entry',
  template: `
<div class="provider-entry" *ngIf="entry.FirstName">
  <div class="title">
    {{(entry.LastName || '') + ' ' + (entry.FirstName || '')}}
  </div>
  <div class="contact-buttons">
    <button md-icon-button
            (click)="onContactPersonClick.emit(entry); $event.stopPropagation();">
      <md-icon svgIcon="dots-vertical"></md-icon>
    </button>
  </div>
</div>
<div class="entry" *ngIf="!entry.FirstName">{{entry}}</div>
`
})
export class SearchResultsEntryComponent {
  @Input() entry: Employee;
  @Output() onContactPersonClick = new EventEmitter<Employee>();
}
