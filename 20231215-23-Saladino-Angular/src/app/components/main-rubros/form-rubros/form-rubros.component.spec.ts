import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRubrosComponent } from './form-rubros.component';

describe('FormRubrosComponent', () => {
  let component: FormRubrosComponent;
  let fixture: ComponentFixture<FormRubrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormRubrosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormRubrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
