import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHotel1Component } from './admin-hotel1.component';

describe('AdminHotel1Component', () => {
  let component: AdminHotel1Component;
  let fixture: ComponentFixture<AdminHotel1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminHotel1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminHotel1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
