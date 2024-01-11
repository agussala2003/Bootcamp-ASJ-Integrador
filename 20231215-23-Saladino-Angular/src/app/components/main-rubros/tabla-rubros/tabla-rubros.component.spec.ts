import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaRubrosComponent } from './tabla-rubros.component';

describe('TablaRubrosComponent', () => {
  let component: TablaRubrosComponent;
  let fixture: ComponentFixture<TablaRubrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TablaRubrosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TablaRubrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
