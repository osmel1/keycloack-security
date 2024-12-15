import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDetatilsComponent } from './order-detatils.component';

describe('OrderDetatilsComponent', () => {
  let component: OrderDetatilsComponent;
  let fixture: ComponentFixture<OrderDetatilsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderDetatilsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderDetatilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
