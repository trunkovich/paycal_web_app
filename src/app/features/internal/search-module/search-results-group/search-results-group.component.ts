import {Component, Input, Output, EventEmitter} from '@angular/core';

import {SearchResults} from '../../../../STATE/models/search-results.model';
import {Employee} from '../../../../STATE/models/employee.model';

@Component({
  selector: 'pcl-search-results-group',
  template: `
<pre>
{{group | json}}
</pre>
  `,
  styles: []
})
export class SearchResultsGroupComponent {
  @Input() group: SearchResults;
  @Output() entryClick = new EventEmitter<string | Employee>();
}
