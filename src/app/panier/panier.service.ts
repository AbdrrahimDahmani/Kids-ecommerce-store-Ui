import { Injectable } from '@angular/core';

export type CartItem = {
  id: string;
  title: string;
  image: string;
  price: number;
  quantity: number;
};

@Injectable({
  providedIn: 'root',
})
export class PanierService {
  private cartItems: Array<CartItem> = [];

  constructor() {}
  addToCart(item: CartItem) {
    this.cartItems.push(item);

    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  getCartItems() {
    const cartItems = localStorage.getItem('cartItems');
    if (cartItems) {
      return JSON.parse(cartItems);
    } else {
      return [];
    }
  }

  findCartById(id: string) {
    return this.cartItems.find((item) => item.id === id);
  }

  updateCartItemQuantity(id: string, quantity: number) {
    this.cartItems = this.getCartItems();
    console.log(this.cartItems);
    // Find the cart item with the given ID
    const cartItem = this.cartItems.find((item) => item.id === id);
    if (cartItem) {
      // Update the quantity of the cart item
      cartItem.quantity = quantity;

      // Save the cart items to localStorage
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    }
    // Return the updated cart item
    return cartItem;
  }

  removeFromCart(id: string) {
    this.cartItems = this.getCartItems();
    this.cartItems = this.cartItems.filter((item) => item.id !== id);

    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }
  removeAll() {
    this.cartItems = [];
    localStorage.clear();
  }
  calcTotalPrice() {
    this.cartItems = this.getCartItems();
    const prixTotal = this.cartItems
      .map((x) => x.price * x.quantity)
      .reduce((a, b) => a + b, 0);
    return prixTotal;
  }
  calcTotalPriceWithCoupon(type: string, value: number) {
    if (type === 'percentage') {
      return this.calcTotalPrice() - (this.calcTotalPrice() * value) / 100;
    }
    return this.calcTotalPrice() - value;
  }
}
