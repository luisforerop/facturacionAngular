import { TestBed } from '@angular/core/testing';

import { AplidatosService } from './aplidatos.service';

describe('AplidatosService', () => {
  let service: AplidatosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AplidatosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
