import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaOrdenesdecompraComponent } from './tabla-ordenesdecompra.component';

describe('TablaOrdenesdecompraComponent', () => {
  let component: TablaOrdenesdecompraComponent;
  let fixture: ComponentFixture<TablaOrdenesdecompraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TablaOrdenesdecompraComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TablaOrdenesdecompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
