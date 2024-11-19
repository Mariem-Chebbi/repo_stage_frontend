import { TestBed } from '@angular/core/testing';

import { ExhaustiveTutorialService } from './exhaustive-tutorial.service';

describe('ExhaustiveTutorialService', () => {
  let service: ExhaustiveTutorialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExhaustiveTutorialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
