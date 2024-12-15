import { Component } from '@angular/core';
import {OrdersService} from '../services/orders.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {
  orders: any[] = [];
  isLoading: boolean = true;
  errorMessage: string | null = null;

  constructor(private ordersService: OrdersService, private router: Router) {}

  ngOnInit(): void {
    this.fetchOrders();
  }

  fetchOrders(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.ordersService.getOrders().subscribe({
      next: (response) => {
        this.orders = response;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('There was an error fetching orders!', error);
        this.errorMessage = 'Failed to load orders. Please try again later.';
        this.isLoading = false;
      }
    });
  }
  getOrderStateClass(state: string): string {
    switch (state.toLowerCase()) {
      case 'confirmed':
        return 'badge-success';
      case 'pending':
        return 'badge-info';
      case 'cancelled':
        return 'badge-danger';
      default:
        return 'badge-secondary';
    }
  }

  viewOrderDetails(orderId: string): void {
    this.router.navigateByUrl(`/orders/${orderId}`);
  }
}
