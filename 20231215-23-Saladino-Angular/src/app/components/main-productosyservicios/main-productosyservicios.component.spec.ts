import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainProductosyserviciosComponent } from './main-productosyservicios.component';

describe('MainProductosyserviciosComponent', () => {
  let component: MainProductosyserviciosComponent;
  let fixture: ComponentFixture<MainProductosyserviciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainProductosyserviciosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainProductosyserviciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
