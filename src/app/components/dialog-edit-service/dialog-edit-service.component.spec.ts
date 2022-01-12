import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditServiceComponent } from './dialog-edit-service.component';

describe('DialogEditServiceComponent', () => {
  let component: DialogEditServiceComponent;
  let fixture: ComponentFixture<DialogEditServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEditServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
