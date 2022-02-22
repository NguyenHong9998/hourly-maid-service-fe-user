import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDoneTaskComponent } from './dialog-done-task.component';

describe('DialogDoneTaskComponent', () => {
  let component: DialogDoneTaskComponent;
  let fixture: ComponentFixture<DialogDoneTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDoneTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDoneTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
