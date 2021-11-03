import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { FilterService } from 'src/app/services/filter.service';
import { ProductFilterService } from 'src/app/services/product-filter.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private cartService: CartService,
    private filterService: FilterService,
    private readonly productFilterService: ProductFilterService
  ) {}

  public value = '';
  public totalItem = 0;
  public searchedData: string = '';
  public form = this.filterService.filterForm;
  readonly searchCtrl = this.productFilterService.searchCtrl;

  ngOnInit(): void {
    this.cartService.prductList$.subscribe((res) => {
      this.totalItem = res.length;
    });
  }
}
