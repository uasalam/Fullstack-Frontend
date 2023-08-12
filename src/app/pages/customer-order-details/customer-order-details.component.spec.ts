import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerOrderDetailsComponent } from './customer-order-details.component';

describe('CustomerOrderDetailsComponent', () => {
  let component: CustomerOrderDetailsComponent;
  let fixture: ComponentFixture<CustomerOrderDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerOrderDetailsComponent]
    });
    fixture = TestBed.createComponent(CustomerOrderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
