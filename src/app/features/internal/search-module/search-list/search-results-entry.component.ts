import { Component, Input } from '@angular/core';

import { Employee } from '../../../../STATE/models/employee.model';

@Component({
  selector: 'pcl-search-results-entry',
  template: `
<div class="provider-entry" *ngIf="entry.FirstName">
  <div class="title">
    {{(entry.LastName || '') + ' ' + (entry.FirstName || '')}}
  </div>
  <div class="contact-buttons">
    <a md-icon-button
       href="tel:{{entry.MobilePhone}}"
       (click)="$event.stopPropagation()">
      <md-icon svgIcon="phone"></md-icon>
    </a>
    <a md-icon-button
       href="mailto:{{entry.Email}}"
       (click)="$event.stopPropagation()">
      <md-icon svgIcon="email"></md-icon>
    </a>
    <a md-icon-button
       [href]="('sms:' + entry.MobilePhone + '?body=Hello ' + entry.FirstName) | safeUrl"
       (click)="$event.stopPropagation()">
      <md-icon svgIcon="send"></md-icon>
    </a>
  </div>
</div>
<div class="entry" *ngIf="!entry.FirstName">{{entry}}</div>
`
})
export class SearchResultsEntryComponent {
  @Input() entry: Employee;
}
