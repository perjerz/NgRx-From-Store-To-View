import { CartState, Item, Items } from './cart.interfaces';
import {
  ADD_ITEM_TO_CART,
  LIST_ITEMS,
  ItemToCartAdded,
  AddItemToCart,
  ItemsListed,
  ListItems,
  UPDATE_ITEM_AMOUNT,
  UpdateItemAmount,
  ItemAmountUpdated,
  REMOVE_ITEM,
  RemoveItem,
  ItemRemoved,
  CHECK_OUT,
  CheckOut, ErrorAPI
} from './cart.actions';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { of } from 'rxjs/observable/of';
import { Router } from '@angular/router';

@Injectable()
export class CartEffects {
  // Decorator ระบุว่าคือ Effect และสามารถตั้งค่าว่าาจะ Dispatch Action กลับไปหรือไม่
  @Effect() // สามารถตั้งได้ว่าไม่ dispatch action @Effect({dispatch: false}) แทน
  addItemToCart$ = this.actions$.pipe(
    // สนใจแค่สายข้อมูล Action ของ Add Item To Cart
    ofType(ADD_ITEM_TO_CART),
    switchMap((action: AddItemToCart) =>
      this.http
        .post<Item>('/item', { id: action.id, amount: action.amount })
        .pipe(
          map(item => new ItemToCartAdded(action.id, action.amount)), // dispatch Action เพื่ออัพเดท item id, amount ไปที่ reducer
          catchError(err => {
            console.error(err);
            return of(new ErrorAPI(err));
          })
        )
    )
  );
  @Effect()
  listItems$ = this.actions$.pipe(
    // สนใจแค่สายข้อมูล Action ของ ListItem
    ofType(LIST_ITEMS),
    switchMap((action: ListItems) =>
      this.http.get<Items>('/items').pipe(
        map(items => new ItemsListed(items)), // dispatch Action เพื่ออัพเดท displayItems ทั้งหมด
        catchError(err => {
          console.error(err);
          return of(new ErrorAPI(err));
        })
      )
    )
  );
  @Effect()
  updateItems$ = this.actions$.pipe(
    ofType(UPDATE_ITEM_AMOUNT),
    switchMap((action: UpdateItemAmount) =>
      this.http.put('/items', { id: action.id, amount: action.amount }).pipe(
        map(item => new ItemAmountUpdated(action.id, action.amount)),
        catchError(err => {
          console.error(err);
          return of(new ErrorAPI(err));
        })
      )
    )
  );
  @Effect()
  removeItem$ = this.actions$.pipe(
    ofType(REMOVE_ITEM),
    switchMap((action: RemoveItem) =>
      this.http.delete(`/items/${action.id}`).pipe(
        map(res => new ItemRemoved(action.id)),
        catchError(err => {
          console.error(err);
          return of(new ErrorAPI(err));
        })
      )
    )
  );
  @Effect({ dispatch: false })
  checkOut$ = this.actions$.pipe(
    ofType(CHECK_OUT),
    switchMap((actiokn: CheckOut) => this.http.get('/checkout')),
    tap(res => {
      this.router.navigate(['/bill']);
    }),
    catchError(err => {
      console.error(err);
      return of(err);
    })
  );

  constructor(
    private http: HttpClient,
    private store: Store<CartState>,
    private actions$: Actions,
    private router: Router
  ) {}
}
