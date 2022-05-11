import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTransferDetailComponent } from './add-transfer-detail.component';

describe('AddTransferDetailComponent', () => {
  let component: AddTransferDetailComponent;
  let fixture: ComponentFixture<AddTransferDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTransferDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTransferDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
