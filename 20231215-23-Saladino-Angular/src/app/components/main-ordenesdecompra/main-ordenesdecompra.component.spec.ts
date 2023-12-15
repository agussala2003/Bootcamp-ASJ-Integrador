import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainOrdenesdecompraComponent } from './main-ordenesdecompra.component';

describe('MainOrdenesdecompraComponent', () => {
  let component: MainOrdenesdecompraComponent;
  let fixture: ComponentFixture<MainOrdenesdecompraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainOrdenesdecompraComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainOrdenesdecompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
