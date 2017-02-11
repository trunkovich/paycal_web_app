import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription, Observable} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import * as _ from 'lodash';

import {SEARCH_ROUTES} from '../search.routes';
import {ALLOWED_SEARCH_TYPES} from '../../../../STATE/reducers/schedule.reducer';
import {Store} from '@ngrx/store';
import {AppState, scheduleSelectors} from '../../../../STATE/reducers/index';
import {SetSearchType, LoadSearchReferenceAction} from '../../../../STATE/actions/schedule.actions';
import {SearchResults} from '../../../../STATE/models/search-results.model';

@Component({
  selector: 'pcl-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss']
})
export class SearchListComponent implements OnInit, OnDestroy {
  sub: Subscription;
  list$: Observable<SearchResults[]>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.store.dispatch(new SetSearchType(null));
    this.list$ = this.store.select(scheduleSelectors.getSearchResults);
    this.sub = this.route.params.subscribe((params) => {
      if (_.includes(ALLOWED_SEARCH_TYPES, params['type'])) {
        this.store.dispatch(new SetSearchType(params['type']));
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

}
