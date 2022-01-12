import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCreateServiceComponent } from './dialog-create-service.component';

describe('DialogCreateServiceComponent', () => {
  let component: DialogCreateServiceComponent;
  let fixture: ComponentFixture<DialogCreateServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCreateServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCreateServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
