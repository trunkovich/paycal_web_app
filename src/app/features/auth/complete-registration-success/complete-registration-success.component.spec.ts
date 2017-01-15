/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteRegistrationSuccessComponent } from './complete-registration-success.component';

describe('CompleteRegistrationSuccessComponent', () => {
  let component: CompleteRegistrationSuccessComponent;
  let fixture: ComponentFixture<CompleteRegistrationSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompleteRegistrationSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompleteRegistrationSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
