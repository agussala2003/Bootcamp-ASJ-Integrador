import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainProveedoresComponent } from './main-proveedores.component';

describe('MainProveedoresComponent', () => {
  let component: MainProveedoresComponent;
  let fixture: ComponentFixture<MainProveedoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainProveedoresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainProveedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
