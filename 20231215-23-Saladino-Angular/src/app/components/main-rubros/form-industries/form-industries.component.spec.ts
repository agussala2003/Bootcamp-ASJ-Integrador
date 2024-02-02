import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormIndustriesComponent } from './form-industries.component';

describe('FormIndustriesComponent', () => {
  let component: FormIndustriesComponent;
  let fixture: ComponentFixture<FormIndustriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormIndustriesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormIndustriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
