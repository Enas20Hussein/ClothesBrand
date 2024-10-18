import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCustomOrderComponent } from './create-custom-order.component';

describe('CreateCustomOrderComponent', () => {
  let component: CreateCustomOrderComponent;
  let fixture: ComponentFixture<CreateCustomOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCustomOrderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCustomOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
