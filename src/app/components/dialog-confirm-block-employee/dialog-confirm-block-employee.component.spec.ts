import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogConfirmBlockEmployeeComponent } from './dialog-confirm-block-employee.component';

describe('DialogConfirmBlockEmployeeComponent', () => {
  let component: DialogConfirmBlockEmployeeComponent;
  let fixture: ComponentFixture<DialogConfirmBlockEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogConfirmBlockEmployeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogConfirmBlockEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
