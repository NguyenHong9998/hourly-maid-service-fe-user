import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogListDiscountServiceComponent } from './dialog-list-discount-service.component';

describe('DialogListDiscountServiceComponent', () => {
  let component: DialogListDiscountServiceComponent;
  let fixture: ComponentFixture<DialogListDiscountServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogListDiscountServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogListDiscountServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
