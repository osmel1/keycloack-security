import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductsComponent} from './products/products.component';
import {OrdersComponent} from './orders/orders.component';
import {OrderDetatilsComponent} from './order-detatils/order-detatils.component';
import {AuthGuard} from './guards/auth.guard';
const routes: Routes = [
  {path : "products", component : ProductsComponent, canActivate: [AuthGuard], data: { roles: ['USER'] }},
  {path : "orders", component : OrdersComponent, canActivate: [AuthGuard], data: { roles: ['USER'] }},
  {path : "orders/:id", component : OrderDetatilsComponent, canActivate: [AuthGuard], data: { roles: ['USER'] }},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
