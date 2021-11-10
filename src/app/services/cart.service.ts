import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ProductInShop } from '../models/product-model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private readonly localStorageService: LocalStorageService) {
    this.loadCart();
    this.updateStorageOnCartChange().subscribe();
  }

  private readonly cart = new BehaviorSubject<ProductInShop[]>([]);
  readonly cart$ = this.cart.asObservable();

  addProduct(product: ProductInShop) {
    const productInCart = this.cart.value.find(
      (productInCart) => productInCart.id === product.id
    );

    this.cart.next(
      productInCart
        ? [
            ...this.cart.value.filter(
              (filteredProduct) => filteredProduct.id !== productInCart.id
            ),
            {
              ...productInCart,
              quantity: productInCart.quantity + product.quantity,
            },
          ]
        : [...this.cart.value, product]
    );
  }

  removeProduct(productId: number) {
    this.cart.next(
      this.cart.value.filter((product) => product.id !== productId)
    );
  }

  increaseProductQuantity(product: ProductInShop) {
    this.cart.next([
      ...this.cart.value.filter(
        (productInCart) => productInCart.id !== product.id
      ),
      { ...product, quantity: product.quantity + 1 },
    ]);
  }

  decreaseProductQuantity(product: ProductInShop) {
    product.quantity > 1
      ? this.cart.next([
          ...this.cart.value.filter(
            (productInCart) => productInCart.id !== product.id
          ),
          { ...product, quantity: product.quantity - 1 },
        ])
      : this.removeProduct(product.id);
  }

  clearCart() {
    this.cart.next([]);
    this.localStorageService.removeCart();
  }

  loadCart() {
    this.cart.next(this.localStorageService.getCart());
  }

  updateStorageOnCartChange() {
    return this.cart$.pipe(
      tap((cart) => this.localStorageService.setCart(cart))
    );
  }
}
