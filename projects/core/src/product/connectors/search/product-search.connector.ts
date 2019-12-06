import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ProductSearchAdapter } from './product-search.adapter';
import { SearchConfig } from '../../model/search-config';
import {
  ProductSearchPage,
  Suggestion,
} from '../../../model/product-search.model';

@Injectable({
  providedIn: 'root',
})
export class ProductSearchConnector {
  constructor(protected adapter: ProductSearchAdapter) {}

  search(
    query: string,
    searchConfig?: SearchConfig
  ): Observable<ProductSearchPage> {
    return this.adapter.search(query, searchConfig);
  }

  getSuggestions(term: string, pageSize?: number): Observable<Suggestion[]> {
    return this.adapter.loadSuggestions(term, pageSize);
  }
}
