import 'zone.js/dist/zone';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SearchService } from './search.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  providers: [SearchService],
  template: `
  <div>
      <h1>Search</h1>
      <input type="text" #searchTerm (input)="searchByTerm(searchTerm.value)" />
      <div class="product" *ngIf="products$ | async as products">
        <div *ngFor="let product of products">
          <h3>{{ product.title }}</h3>
          <img class="thumbnail" [alt]="product.title" [src]="product.thumbnail" />
        </div>
      </div>
    </div>
   
  `,
})
export class App {
  #searchService = inject(SearchService);
  products$: Observable<any> = this.#searchService.products$;

  searchByTerm(value: string) {
    this.#searchService.searchByText(value);
  }
}

bootstrapApplication(App);
