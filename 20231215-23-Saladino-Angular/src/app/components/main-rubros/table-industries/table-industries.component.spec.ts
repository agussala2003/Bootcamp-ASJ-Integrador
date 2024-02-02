import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableIndustriesComponent } from './table-industries.component';

describe('TableIndustriesComponent', () => {
  let component: TableIndustriesComponent;
  let fixture: ComponentFixture<TableIndustriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableIndustriesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableIndustriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
