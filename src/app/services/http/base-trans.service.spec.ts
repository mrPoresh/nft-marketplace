import { TestBed } from '@angular/core/testing';

import { BaseTransService } from './base-trans.service';

describe('BaseTransService', () => {
  let service: BaseTransService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaseTransService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
