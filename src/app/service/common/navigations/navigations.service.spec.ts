import { TestBed } from '@angular/core/testing';

import { NavigationsService } from './navigations.service';

describe('NavigationsService', () => {
  let service: NavigationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavigationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
