import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminClient1Component } from './admin-client1.component';

describe('AdminClient1Component', () => {
  let component: AdminClient1Component;
  let fixture: ComponentFixture<AdminClient1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminClient1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminClient1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
