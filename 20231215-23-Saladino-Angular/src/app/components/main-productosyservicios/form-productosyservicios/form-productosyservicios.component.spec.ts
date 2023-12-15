import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormProductosyserviciosComponent } from './form-productosyservicios.component';

describe('FormProductosyserviciosComponent', () => {
  let component: FormProductosyserviciosComponent;
  let fixture: ComponentFixture<FormProductosyserviciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormProductosyserviciosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormProductosyserviciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
