import {Component, Input, Output, EventEmitter} from '@angular/core';

import {SearchResults} from '../../../../STATE/models/search-results.model';
import {Employee} from '../../../../STATE/models/employee.model';

@Component({
  selector: 'pcl-search-results-group',
  template: `
<pcl-search-results-entry *ngFor="let entry of group.entries" 
                          [entry]="entry" 
                          (click)="entryClick.emit(entry)">
</pcl-search-results-entry>
`
})
export class SearchResultsGroupComponent {
  @Input() group: SearchResults;
  @Output() entryClick = new EventEmitter<string | Employee>();
}
