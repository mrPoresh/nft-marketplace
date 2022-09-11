import { TestBed } from '@angular/core/testing';

import { IpfsDeamonService } from './ipfs-deamon.service';

describe('IpfsDeamonService', () => {
  let service: IpfsDeamonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IpfsDeamonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
