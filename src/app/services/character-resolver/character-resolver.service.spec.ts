import { TestBed } from '@angular/core/testing';

import { CharacterResolverService } from './character-resolver.service';

describe('CharacterResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CharacterResolverService = TestBed.get(CharacterResolverService);
    expect(service).toBeTruthy();
  });
});
