import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditLeaveDateComponent } from './dialog-edit-leave-date.component';

describe('DialogEditLeaveDateComponent', () => {
  let component: DialogEditLeaveDateComponent;
  let fixture: ComponentFixture<DialogEditLeaveDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEditLeaveDateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditLeaveDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
