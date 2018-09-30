import { TestBed } from '@angular/core/testing';

import { PlanetsResolverService } from './planets-resolver.service';

describe('PlanetsResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlanetsResolverService = TestBed.get(PlanetsResolverService);
    expect(service).toBeTruthy();
  });
});
