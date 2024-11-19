import { TestBed } from '@angular/core/testing';

import { SIPOCserviceService } from './sipocservice';

describe('SIPOCserviceService', () => {
  let service: SIPOCserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SIPOCserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
