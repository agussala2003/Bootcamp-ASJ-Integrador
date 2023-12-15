import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaProductosyserviciosComponent } from './tabla-productosyservicios.component';

describe('TablaProductosyserviciosComponent', () => {
  let component: TablaProductosyserviciosComponent;
  let fixture: ComponentFixture<TablaProductosyserviciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TablaProductosyserviciosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TablaProductosyserviciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
