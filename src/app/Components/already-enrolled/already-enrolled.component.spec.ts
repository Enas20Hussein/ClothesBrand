import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlreadyEnrolledComponent } from './already-enrolled.component';

describe('AlreadyEnrolledComponent', () => {
  let component: AlreadyEnrolledComponent;
  let fixture: ComponentFixture<AlreadyEnrolledComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlreadyEnrolledComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlreadyEnrolledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
