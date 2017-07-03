import { Component, EventEmitter, Input, Output } from '@angular/core';

import { SearchResults } from '../../../../STATE/models/search-results.model';
import { Employee } from '../../../../STATE/models/employee.model';

@Component({
  selector: 'pcl-search-results-list',
  template: `
<pcl-search-results-group *ngFor="let group of list" 
                          [group]="group" 
                          (entryClick)="entryClick.emit($event)"
                          (onContactPersonClick)="onContactPersonClick.emit($event)">
</pcl-search-results-group>
`
})
export class SearchResultsListComponent {
  @Input() list: SearchResults[];
  @Output() entryClick = new EventEmitter<string | Employee>();
  @Output() onContactPersonClick = new EventEmitter<Employee>();
}
