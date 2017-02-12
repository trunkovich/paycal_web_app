import {Component, Input, Output, EventEmitter, OnChanges} from '@angular/core';
import {FormControl, FormGroup, FormBuilder} from '@angular/forms';

@Component({
  selector: 'pcl-search-input',
  template: `
<form  novalidate [formGroup]="searchForm">
  <div class="icon">
    <md-icon [svgIcon]="'nav-search'"></md-icon>
  </div>
  <input type="text" 
          placeholder="Search"
          formControlName="searchControl">
</form>
`
})
export class SearchInputComponent implements OnChanges {
  @Input() searchText: string;
  @Output() searchTextChange = new EventEmitter<string>();
  searchControl = new FormControl('');
  searchForm: FormGroup;

  constructor(private _fb: FormBuilder) {
    this.searchForm = _fb.group({
      searchControl: this.searchControl
    });
    this.searchControl.valueChanges.subscribe((value) => {
      this.searchTextChange.emit(value);
    });
  }

  ngOnChanges(changes) {
    if (changes && changes.searchText.currentValue && this.searchControl.value !== changes.searchText.currentValue ) {
      this.searchControl.setValue(changes.searchText.currentValue);
    }
  }

}
