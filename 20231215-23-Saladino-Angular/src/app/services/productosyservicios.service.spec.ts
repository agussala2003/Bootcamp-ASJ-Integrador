import { TestBed } from '@angular/core/testing';

import { ProductosyserviciosService } from './productosyservicios.service';

describe('ProductosyserviciosService', () => {
  let service: ProductosyserviciosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductosyserviciosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
