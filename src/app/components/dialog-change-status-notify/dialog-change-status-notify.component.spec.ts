import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogChangeStatusNotifyComponent } from './dialog-change-status-notify.component';

describe('DialogChangeStatusNotifyComponent', () => {
  let component: DialogChangeStatusNotifyComponent;
  let fixture: ComponentFixture<DialogChangeStatusNotifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogChangeStatusNotifyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogChangeStatusNotifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
