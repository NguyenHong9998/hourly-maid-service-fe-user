import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogChangeStatusDiscountComponent } from './dialog-change-status-discount.component';

describe('DialogChangeStatusDiscountComponent', () => {
  let component: DialogChangeStatusDiscountComponent;
  let fixture: ComponentFixture<DialogChangeStatusDiscountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogChangeStatusDiscountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogChangeStatusDiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
