import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertSenderComponent } from './alert-sender.component';

describe('AlertSenderComponent', () => {
  let component: AlertSenderComponent;
  let fixture: ComponentFixture<AlertSenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertSenderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlertSenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
