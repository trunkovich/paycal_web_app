/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { QualifiendPhysiciansListComponent } from './qualifiend-physicians-list.component';

describe('QualifiendPhysiciansListComponent', () => {
  let component: QualifiendPhysiciansListComponent;
  let fixture: ComponentFixture<QualifiendPhysiciansListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QualifiendPhysiciansListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QualifiendPhysiciansListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
