import {Component, Input, EventEmitter, Output} from '@angular/core';
import {SearchResults} from '../../../../STATE/models/search-results.model';
import {Employee} from '../../../../STATE/models/employee.model';

@Component({
  selector: 'pcl-search-results-list',
  template: `
<pre>
{{list | json}}
</pre>
`,
  styles: [`

`]
})
export class SearchResultsListComponent {
  @Input() list: SearchResults[];
  @Output() entryClick = new EventEmitter<string | Employee>();
}
