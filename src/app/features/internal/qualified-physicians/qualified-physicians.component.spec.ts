/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { QualifiedPhysiciansComponent } from './qualified-physicians.component';

describe('QualifiedPhysiciansComponent', () => {
  let component: QualifiedPhysiciansComponent;
  let fixture: ComponentFixture<QualifiedPhysiciansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QualifiedPhysiciansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QualifiedPhysiciansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
