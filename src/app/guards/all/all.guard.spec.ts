import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { allGuard } from './all.guard';

describe('allGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => allGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
