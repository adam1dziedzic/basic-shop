import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { HomeComponent } from './components/home/home.component';
import { ListProductsComponent } from './components/products/list-products/list-products.component';
import { ProductsComponent } from './components/products/products.component';
import { SingleProductComponent } from './components/products/single-product/single-product.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'products',
    component: ProductsComponent,
    children: [
      { path: 'list-products', component: ListProductsComponent },
      { path: 'single-product', component: SingleProductComponent },
    ],
  },
  { path: 'shopping-cart', component: CartComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
