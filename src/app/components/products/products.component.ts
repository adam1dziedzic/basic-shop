import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { FilterService } from 'src/app/services/filter.service';
import { ProductFilterService } from 'src/app/services/product-filter.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  constructor(
    private cart: CartService,
    private filter: FilterService,
    private readonly productFilterService: ProductFilterService
  ) {}

  public form = this.filter.filterForm;
  readonly categoryCtrl = this.productFilterService.categoryCtrl;

  ngOnInit(): void {
    this.filter.onValueChanges();
  }
}
