import { TestBed } from '@angular/core/testing';

import { SdkLoginService } from './sdk-login.service';

describe('SdkLoginService', () => {
  let service: SdkLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SdkLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
