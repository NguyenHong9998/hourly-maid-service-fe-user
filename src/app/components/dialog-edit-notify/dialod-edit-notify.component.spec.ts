import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialodEditNotifyComponent } from './dialod-edit-notify.component';

describe('DialodEditNotifyComponent', () => {
  let component: DialodEditNotifyComponent;
  let fixture: ComponentFixture<DialodEditNotifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialodEditNotifyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialodEditNotifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
