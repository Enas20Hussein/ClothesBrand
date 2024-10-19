import { TestBed } from '@angular/core/testing';

import { CartSharedService } from './cart-shared.service';

describe('CartSharedService', () => {
  let service: CartSharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartSharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
