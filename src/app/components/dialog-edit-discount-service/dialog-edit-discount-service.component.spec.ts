import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditDiscountServiceComponent } from './dialog-edit-discount-service.component';

describe('DialogEditDiscountServiceComponent', () => {
  let component: DialogEditDiscountServiceComponent;
  let fixture: ComponentFixture<DialogEditDiscountServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEditDiscountServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditDiscountServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
