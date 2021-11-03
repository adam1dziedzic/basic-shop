import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { combineLatest } from 'rxjs';
import { debounceTime, startWith } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductFilterService {
  constructor(private readonly fb: FormBuilder) {}

  readonly searchCtrl = this.fb.control(null);
  readonly categoryCtrl = this.fb.control(null);

  valueChangesListener() {
    return combineLatest([
      this.searchCtrl.valueChanges.pipe(startWith(''), debounceTime(500)),
      this.categoryCtrl.valueChanges.pipe(startWith(null)),
    ]);
  }
}
