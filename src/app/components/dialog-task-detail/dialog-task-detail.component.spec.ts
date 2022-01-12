import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTaskDetailComponent } from './dialog-task-detail.component';

describe('DialogTaskDetailComponent', () => {
  let component: DialogTaskDetailComponent;
  let fixture: ComponentFixture<DialogTaskDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogTaskDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogTaskDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
