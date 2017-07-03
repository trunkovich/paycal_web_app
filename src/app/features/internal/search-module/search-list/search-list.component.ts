import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';

import { SEARCH_ROUTES } from '../search.routes';
import { ALLOWED_SEARCH_TYPES } from '../../../../STATE/reducers/schedule.reducer';
import { AppState, searchSelectors } from '../../../../STATE/reducers/index';
import { SearchResults } from '../../../../STATE/models/search-results.model';
import { Employee } from '../../../../STATE/models/employee.model';
import { LoadSearchReferenceAction, SetSearchTextAction, SetSearchType } from '../../../../STATE/actions/search.actions';
import { ContactPersonBottomSheetComponent } from '../../contact-person-bottom-sheet/contact-person-bottom-sheet.component';
import { BottomSheetService } from '../../../../bottom-sheet/bottom-sheet.service';

@Component({
  selector: 'pcl-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss']
})
export class SearchListComponent implements OnInit, OnDestroy {
  sub: Subscription;
  list$: Observable<SearchResults[]>;
  loading$: Observable<boolean>;
  title: string;
  searchText: Observable<string>;
  type: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>,
    private bss: BottomSheetService
  ) { }

  ngOnInit() {
    this.list$ = this.store.select(searchSelectors.getSearchResults);
    this.searchText = this.store.select(searchSelectors.getSearchText);
    this.loading$ = this.store.select(searchSelectors.getLoadingState);
    this.sub = this.route.params.subscribe((params) => {
      if (_.includes(ALLOWED_SEARCH_TYPES, params['type'])) {
        this.type = params['type'];
        this.store.dispatch(new SetSearchType(this.type));
        this.title = this.type === 'physicians' ? 'Providers' : (this.type === 'call-reference' ? 'Call Reference' : 'Or Reference');
        this.store.dispatch(new LoadSearchReferenceAction());
      } else {
        this.router.navigate(['/', SEARCH_ROUTES.SEARCH]);
      }
    });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  back() {
    this.router.navigate(['/', SEARCH_ROUTES.SEARCH]);
  }

  onSearchTextChange(search: string) {
    this.store.dispatch(new SetSearchTextAction(search));
  }

  onEntryClick(entry: string | Employee) {
    if (this.type === 'physicians') {
      this.router.navigate(['/', SEARCH_ROUTES.SEARCH, this.type, (entry as Employee).EmployeeID]);
    } else {
      this.router.navigate(['/', SEARCH_ROUTES.SEARCH, this.type, entry]);
    }
  }

  openContactPersonDialog(entry: Employee) {
    this.bss.open(ContactPersonBottomSheetComponent, {
      schedulePersonId: entry.ScheduledPersonID
    });
  }

}
