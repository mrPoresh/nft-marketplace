import { TestBed } from '@angular/core/testing';

import { AlchemyMainService } from './alchemy-main.service';

describe('AlchemyMainService', () => {
  let service: AlchemyMainService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlchemyMainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
