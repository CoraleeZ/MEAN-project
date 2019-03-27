import { TestBed } from '@angular/core/testing';

import { PokeSelectService } from './poke-select.service';

describe('PokeSelectService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PokeSelectService = TestBed.get(PokeSelectService);
    expect(service).toBeTruthy();
  });
});
