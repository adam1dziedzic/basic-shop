import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';
import { FilterService } from 'src/app/services/filter.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  constructor(
    private filterService: FilterService,
    private http: ApiService,
    private cartService: CartService
  ) {}

  readonly ctrlSearch = this.filterService.ctrlSearch;
  readonly productsInCart$ = this.cartService.cart$.pipe(
    map((cart) => cart.length)
  );

  ngOnInit() {
    this.http.getProduct().subscribe();
  }
}
