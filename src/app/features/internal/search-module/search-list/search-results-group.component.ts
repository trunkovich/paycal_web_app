import { Component, EventEmitter, Input, Output } from '@angular/core';

import { SearchResults } from '../../../../STATE/models/search-results.model';
import { Employee } from '../../../../STATE/models/employee.model';

@Component({
  selector: 'pcl-search-results-group',
  template: `
<div class="physician-group-header">{{group.letter}}</div>
<pcl-search-results-entry *ngFor="let entry of group.entries" 
                          [entry]="entry" 
                          (click)="entryClick.emit(entry)"
                          (onContactPersonClick)="onContactPersonClick.emit($event)">
</pcl-search-results-entry>
`
})
export class SearchResultsGroupComponent {
  @Input() group: SearchResults;
  @Output() entryClick = new EventEmitter<string | Employee>();
  @Output() onContactPersonClick = new EventEmitter<Employee>();
}
