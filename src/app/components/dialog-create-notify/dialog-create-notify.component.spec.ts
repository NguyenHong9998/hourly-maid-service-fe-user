import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCreateNotifyComponent } from './dialog-create-notify.component';

describe('DialogCreateNotifyComponent', () => {
  let component: DialogCreateNotifyComponent;
  let fixture: ComponentFixture<DialogCreateNotifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCreateNotifyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCreateNotifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
