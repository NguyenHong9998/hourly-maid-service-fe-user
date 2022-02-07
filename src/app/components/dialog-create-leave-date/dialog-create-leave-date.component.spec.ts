import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCreateLeaveDateComponent } from './dialog-create-leave-date.component';

describe('DialogCreateLeaveDateComponent', () => {
  let component: DialogCreateLeaveDateComponent;
  let fixture: ComponentFixture<DialogCreateLeaveDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCreateLeaveDateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCreateLeaveDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
