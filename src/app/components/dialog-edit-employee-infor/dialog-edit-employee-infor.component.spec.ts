import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditEmployeeInforComponent } from './dialog-edit-employee-infor.component';

describe('DialogEditEmployeeInforComponent', () => {
  let component: DialogEditEmployeeInforComponent;
  let fixture: ComponentFixture<DialogEditEmployeeInforComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEditEmployeeInforComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditEmployeeInforComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
