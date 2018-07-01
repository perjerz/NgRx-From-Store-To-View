import { Component } from '@angular/core';
import { CartState, Item } from './+state/cart.interfaces';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AddItemToCart, CheckOut, ListItems, UpdateItemAmount } from './+state/cart.actions';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { getDisplayItems, selectedItemsEntities } from './+state/cart.selectors';

@Component({
  selector: 'ecommerce-root',
  template: `
    <form [formGroup]="form" (ngSubmit)="checkout()">
      <h1>Products</h1>
      <ng-container *ngIf="displayItems$ | async as displayItems">
        <div *ngFor="let item of displayItems">
          <h1>{{item.id}} {{item.name}}</h1>
          <h2>{{item.type}} {{item.price}} BAHT</h2>
          <p>{{item.description}}</p>
          <img [src]="item.imgSrc" />
          <input type="number" formControlName="amount" />
          <button type="button" (click)="addProduct(item.id)">Add Product</button>
        </div>
      </ng-container>
      <h1>Cart</h1>
      <ng-container *ngIf="selectedItems$ | async as selectedItems">
        <div *ngFor="let item of selectedItems">
          {{item.id}} {{item.name}} {{item.type}} {{item.price}} {{item.description}}
          <img src="item.imgSrc" />
          <input type="number" formControlName="amount" />
          <button type="button" (click)="updateProductAmount(item.id)">Update Product Amount</button>
        </div>
        <hr />
      </ng-container>
      <button type="submit">Checkout!</button>
    </form>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  form: FormGroup;
  displayItems$: Observable<Item[]>;
  selectedItems$: Observable<{id: { item: Item, amount: number}}[]>;
  constructor(private store: Store<CartState>) {
    this.form = new FormGroup({
      amount: new FormControl('', [Validators.required])
    });
    this.store.dispatch(new ListItems());
    // this.displayItems$ = this.store.select(state => state.cart.displayItems);
    // this.selectedItems$ = this.store.select(state => state.cart.selectedItems);
    this.displayItems$ = this.store.select(getDisplayItems);
    this.selectedItems$ = this.store.select(selectedItemsEntities);
  }
  addProduct(id: string) {
    this.store.dispatch(new AddItemToCart(id,this.form.value));
  }
  checkout() {
    this.store.dispatch(new CheckOut());
  }
  updateProductAmount(id: string) {
    this.store.dispatch(new UpdateItemAmount(id, this.form.value))
  }
}
