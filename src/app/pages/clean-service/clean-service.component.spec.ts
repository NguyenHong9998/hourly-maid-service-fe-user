import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CleanServiceComponent } from './clean-service.component';

describe('CleanServiceComponent', () => {
  let component: CleanServiceComponent;
  let fixture: ComponentFixture<CleanServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CleanServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CleanServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
