import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCreateDiscountServiceComponent } from './dialog-create-discount-service.component';

describe('DialogCreateDiscountServiceComponent', () => {
  let component: DialogCreateDiscountServiceComponent;
  let fixture: ComponentFixture<DialogCreateDiscountServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCreateDiscountServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCreateDiscountServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
