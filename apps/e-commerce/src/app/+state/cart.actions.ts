import { Items } from './cart.interfaces';

export const EXAMPLE_ACTION = 'EXAMPLE_ACTION';
export const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART';
export const ITEM_TO_CART_ADDED = 'ITEM_TO_CART_ADDED';
export const LIST_ITEMS = 'LIST_ITEMS';
export const ITEMS_LISTED = 'ITEMS_LISTED';
export const UPDATE_ITEM_AMOUNT = 'UPDATE_ITEMS_AMOUNT';
export const ITEM_AMOUNT_UPDATED = 'ITEM_AMOUNT_UPDATED';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const ITEM_REMOVED = 'ITEMS_REMOVED';
export const CHECK_OUT = 'CHECK_OUT';
export const ERROR_API = 'ERROR_API';

export class ExampleAction {
  // ประกาศ attribute type สำหรับระบุว่าเป็น Action อะไร ใน Reducer
  readonly type = EXAMPLE_ACTION;
  // payload คือของที่จะส่งเข้าไปกับ Action ซึ่งก็คือ Item นั้นและจำนวน จะมัดรวมเป็น Object ก้อนเดียวก็ได้ แต่ผู้เขียนชอบแยกกัน
}

// Action ดึงข้อมูล Item ทั้งหมดจาก API (Side Effect)
export class ListItems {
  readonly type = LIST_ITEMS;
  constructor() {}
}

// Action รับข้อมูลที่ได้จาก API (Update State)
export class ItemsListed {
  readonly type = ITEMS_LISTED;
  constructor(public items: Items) {}
}

// Action User เพิ่มสินค้าเข้ารถเข็นผ่าน API (Side Effect)
export class AddItemToCart {
  readonly type = ADD_ITEM_TO_CART;
  constructor(public id: string, public amount: number) {}
}

// Action User เพิ่มสินค้าเข้ารถเข็นผ่าน API (Side Effect)
export class ItemToCartAdded {
  readonly type = ITEM_TO_CART_ADDED;
  constructor(public id: string, public amount: number) {}
}

// Action User แก้ไขจำนวนสินค้าในรถเข็น ยิงไปที่ API (Side Effect)
export class UpdateItemAmount {
  readonly type = UPDATE_ITEM_AMOUNT;
  constructor(public id: string, public amount: number) {}
}

// Action อัพเดท State ของ Item Amount ใน App (Reducer)
export class ItemAmountUpdated {
  readonly type = ITEM_AMOUNT_UPDATED;
  constructor(public id: string, public amount: number) {}
}

// Action User เอาสินค้าออกจากรถเข็น ยิงไปที่ API (Side Effect)
export class RemoveItem {
  readonly type = REMOVE_ITEM;
  constructor(public id: string) {}
}

// Action User อัพเดท State เอา Item ออกด้วย id ใน App (Reducer)
export class ItemRemoved {
  readonly type = ITEM_REMOVED;
  constructor(public id: string) {}
}

// Action User จ่ายเงิน ยิง Api หลังบ้านตัดเงิน
export class CheckOut {
  readonly type = CHECK_OUT;
  constructor() {}
}

export class ErrorAPI {
  readonly type = ERROR_API;
  constructor(public err: any) {}
}

export type CartAction =
  | ExampleAction
  | AddItemToCart
  | ItemToCartAdded
  | ListItems
  | ItemsListed
  | UpdateItemAmount
  | ItemAmountUpdated
  | RemoveItem
  | ItemRemoved
  | CheckOut
  | ErrorAPI;
