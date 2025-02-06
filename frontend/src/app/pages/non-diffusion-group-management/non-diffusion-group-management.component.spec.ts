import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonDiffusionGroupManagementComponent } from './non-diffusion-group-management.component';

describe('NonDiffusionGroupManagementComponent', () => {
  let component: NonDiffusionGroupManagementComponent;
  let fixture: ComponentFixture<NonDiffusionGroupManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NonDiffusionGroupManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NonDiffusionGroupManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
