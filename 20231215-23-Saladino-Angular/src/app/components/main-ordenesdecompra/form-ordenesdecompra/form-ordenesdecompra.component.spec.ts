import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormOrdenesdecompraComponent } from './form-ordenesdecompra.component';

describe('FormOrdenesdecompraComponent', () => {
  let component: FormOrdenesdecompraComponent;
  let fixture: ComponentFixture<FormOrdenesdecompraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormOrdenesdecompraComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormOrdenesdecompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
