import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeInforComponent } from './employee-infor.component';

describe('EmployeeInforComponent', () => {
  let component: EmployeeInforComponent;
  let fixture: ComponentFixture<EmployeeInforComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeInforComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeInforComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
