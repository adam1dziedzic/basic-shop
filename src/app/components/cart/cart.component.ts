import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProductInShop } from 'src/app/models/product-model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent {
  constructor(private readonly cartService: CartService) {}

  readonly cart$ = this.cartService.cart$;

  removeProduct(productId: number) {
    this.cartService.removeProduct(productId);
  }

  increaseProductQuantity(product: ProductInShop) {
    this.cartService.increaseProductQuantity(product);
  }

  decreaseProductQuantity(product: ProductInShop) {
    this.cartService.decreaseProductQuantity(product);
  }

  clearCart() {
    this.cartService.clearCart();
  }
}
