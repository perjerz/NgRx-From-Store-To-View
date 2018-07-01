export interface Item {
  id: string;
  name: string;
  type: string;
  price: string;
  imgSrc: string;
  description: string;
}

export type Items = {[id: string]: Item };

export interface Cart {
  // Define state here
  // สินค้าทั้งหมดที่ได้รับจาก API เพื่อโชว์ให้ Users เลือก
  displayItems: { [id: string]: Item },
  // คู่ไอดีกับจำนวนสินค้าแต่ละชนิดที่ User มีอยู่ในรถเข็น (Cart)
  selectedItems: { [id: string]: number };
}

export interface CartState {
  readonly cart: Cart;
}
