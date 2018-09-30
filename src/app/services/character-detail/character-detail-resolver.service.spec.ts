import { TestBed } from '@angular/core/testing';

import { CharacterDetailResolverService } from './character-detail-resolver.service';

describe('CharacterDetailResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CharacterDetailResolverService = TestBed.get(CharacterDetailResolverService);
    expect(service).toBeTruthy();
  });
});
