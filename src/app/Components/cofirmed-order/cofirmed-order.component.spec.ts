import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CofirmedOrderComponent } from './cofirmed-order.component';

describe('CofirmedOrderComponent', () => {
  let component: CofirmedOrderComponent;
  let fixture: ComponentFixture<CofirmedOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CofirmedOrderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CofirmedOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
