import { Injectable } from '@angular/core';
import { ProductInShop } from '../models/product-model';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  getCart() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  }

  setCart(cart: ProductInShop[]) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  removeCart() {
    localStorage.removeItem('cart');
  }
}
