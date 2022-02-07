import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFeedbackOfEmployeeComponent } from './dialog-feedback-of-employee.component';

describe('DialogFeedbackOfEmployeeComponent', () => {
  let component: DialogFeedbackOfEmployeeComponent;
  let fixture: ComponentFixture<DialogFeedbackOfEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogFeedbackOfEmployeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogFeedbackOfEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
