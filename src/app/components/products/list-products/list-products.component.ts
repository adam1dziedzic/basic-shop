import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Product } from 'src/app/models/product-model';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductFilterService } from 'src/app/services/product-filter.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css'],
})
export class ListProductsComponent implements OnInit {
  constructor(
    private http: ApiService,
    private cartService: CartService,
    private readonly productFilterService: ProductFilterService
  ) {}

  public listOfProducts: Product[] = [];
  searchKey: string = '';
  public filterCategory: Product[] = [];
  public category: string = '';

  private readonly products = new BehaviorSubject<Product[]>([]);
  readonly products$ = this.products.asObservable();

  readonly filteredProducts$ = combineLatest([
    this.productFilterService.valueChangesListener(),
    this.products$,
  ]).pipe(
    map(([[search, category], products]) =>
      products.filter((product) =>
        category
          ? product.title.toLowerCase().includes(search.trim().toLowerCase()) &&
            product.category === category
          : product.title.toLowerCase().includes(search.trim().toLowerCase())
      )
    )
  );

  ngOnInit() {
    this.getProducts().subscribe();
  }

  addToCart(item: Product) {
    this.cartService.addProduct(item);
  }

  private getProducts() {
    return this.http
      .getProduct()
      .pipe(tap((products) => this.products.next(products)));
  }
}
