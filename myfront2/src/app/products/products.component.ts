import {Component, OnInit} from '@angular/core';
import {ProductsService} from '../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{
  products: any[] = [];
  isLoading = true;

  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts() {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching products:', err);
        this.isLoading = false;
      },
    });
  }

 /* viewProduct(id: string) {
    console.log('Viewing product:', id);

  }*/

  editProduct(id: string) {
    console.log('Editing product:', id);
  }
  getQuantityBadgeClass(quantity: number): string {
    if (quantity === 0) {
      return 'badge bg-danger text-light';
    } else if (quantity <= 10) {
      return 'badge bg-warning text-dark';
    } else {
      return 'badge bg-success text-light';
    }
  }

  deleteProduct(id: string) {
    console.log('Deleting product:', id);
    this.productService.deleteProduct(id).subscribe({
      next: () => {
        console.log('Product deleted successfully');
        this.fetchProducts();
      },
      error: (err) => {
        console.error('Error deleting product:', err);
      },
    });
  }
}
