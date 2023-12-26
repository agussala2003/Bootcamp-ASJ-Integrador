import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleProdComponent } from './detalle-prod.component';

describe('DetalleProdComponent', () => {
  let component: DetalleProdComponent;
  let fixture: ComponentFixture<DetalleProdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetalleProdComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetalleProdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
