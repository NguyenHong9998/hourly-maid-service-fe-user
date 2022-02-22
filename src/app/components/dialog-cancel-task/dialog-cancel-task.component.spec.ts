import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCancelTaskComponent } from './dialog-cancel-task.component';

describe('DialogCancelTaskComponent', () => {
  let component: DialogCancelTaskComponent;
  let fixture: ComponentFixture<DialogCancelTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCancelTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCancelTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
