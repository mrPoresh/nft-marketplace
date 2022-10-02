import { TestBed } from '@angular/core/testing';

import { TokenAddressKeeperService } from './token-address-keeper.service';

describe('TokenAddressKeeperService', () => {
  let service: TokenAddressKeeperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenAddressKeeperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
