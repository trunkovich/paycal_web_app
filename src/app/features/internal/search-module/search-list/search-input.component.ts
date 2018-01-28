import {Component, Input, Output, EventEmitter, OnChanges, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, FormBuilder} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'pcl-search-input',
  template: `
<form  novalidate [formGroup]="searchForm">
  <div class="icon">
    <mat-icon [svgIcon]="'nav-search'"></mat-icon>
  </div>
  <input type="text" 
          placeholder="Search"
          formControlName="searchControl">
</form>
`
})
export class SearchInputComponent implements OnChanges, OnDestroy {
  @Input() searchText: string;
  @Output() searchTextChange = new EventEmitter<string>();
  searchControl = new FormControl('');
  searchForm: FormGroup;
  sub: Subscription;

  constructor(private _fb: FormBuilder) {
    this.searchForm = _fb.group({
      searchControl: this.searchControl
    });
    this.sub = this.searchControl.valueChanges.subscribe((value) => {
      this.searchTextChange.emit(value);
    });
  }

  ngOnChanges(changes) {
    if (changes && changes.searchText.currentValue && this.searchControl.value !== changes.searchText.currentValue ) {
      this.searchControl.setValue(changes.searchText.currentValue);
    }
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

}
