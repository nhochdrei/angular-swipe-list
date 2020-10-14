import { TestBed } from '@angular/core/testing';

import { StandardvaluesService } from './standardvalues.service';

describe('StandardvaluesService', () => {
  let service: StandardvaluesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StandardvaluesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
