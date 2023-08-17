import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  of,
  Subject,
  switchMap,
  tap,
} from 'rxjs';

@Injectable()
export class SearchService {
  http = inject(HttpClient);
  #API = 'https://dummyjson.com/products/search';

  searchTermSubject = new Subject<string>();

  products$ = this.searchTermSubject.asObservable().pipe(
    debounceTime(500),
    distinctUntilChanged(),
    filter((termSearch) => termSearch.trim().length > 2),
    tap((searchTerm) => console.log(`The search term: ${searchTerm}`)),
    switchMap((searchTerm) => this.fetchProducts(searchTerm)),
    map((response: any) => response.products)
  );

  searchByText(term: string) {
    this.searchTermSubject.next(term.trim());
  }

  private fetchProducts(searchTerm: string) {
    const apiUrl = `${this.#API}?q=${searchTerm}`;
    return this.http.get(apiUrl).pipe(
      catchError((error) => {
        console.error('Error getting Products', error);
        return of([]);
      })
    );
  }
}
