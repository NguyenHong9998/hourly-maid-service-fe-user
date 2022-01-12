import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogListEmployeeServiceComponent } from './dialog-list-employee-service.component';

describe('DialogListEmployeeServiceComponent', () => {
  let component: DialogListEmployeeServiceComponent;
  let fixture: ComponentFixture<DialogListEmployeeServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogListEmployeeServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogListEmployeeServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
