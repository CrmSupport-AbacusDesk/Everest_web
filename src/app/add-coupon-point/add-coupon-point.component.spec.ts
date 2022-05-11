import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCouponPointComponent } from './add-coupon-point.component';

describe('AddCouponPointComponent', () => {
  let component: AddCouponPointComponent;
  let fixture: ComponentFixture<AddCouponPointComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCouponPointComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCouponPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
