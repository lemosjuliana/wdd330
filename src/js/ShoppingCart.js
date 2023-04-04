import { getLocalStorage } from "./utils.mjs";
//???????????
import   calculateOrderTotal from "./CheckoutProcess.mjs";

const productList = document.querySelector(".product-list")
productList.addEventListener("click", (event => {
  if (event.target.matches(".remove-item")) {
    const itemId = event.target.dataset.Id;
    const cartItems = getLocalStorage("so-cart");
    const updateCart = cartItems.filter((item) => item.Id !== itemId);
    localStorage.setItem("so-cart", JSON.stringify(updateCart));
    this.renderCartContents();
  }
}));

function shoppingCartTemplate(item) {
  const newItem = `
  <div class="shopping-cart"
  <div class="item">
  <div class="buttons">
          <span class="delete-btn"></span>
          <span class="like-btn"></span>
  <li class="cart-card divider">
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>

    <button type="button" class="quantity-button" data-action="decrease">-</button>
    <input type="number" class="cart-card__quantity" name="quantity" value="1" min="1" max="10">
    <button type="button" class="quantity-button" data-action="increase">+</button>
  
    <p class="cart-card__price">$${item.FinalPrice}</p>
    <span class="remove-item" data-id="${item.Id}">X</span>
  </li>
  </div>
  </div>
  <button class="clear-cart-button">Clear Cart</button>
  `;

  return newItem;
  }

export default class ShoppingCart {
  constructor(key, parentSelector) {
    this.key = key;
    this.parentSelector = parentSelector;
    this.total = 0;
  }
  async init() {
    const list = getLocalStorage(this.key);
    this.calculateListTotal(list);
    this.renderCartContents(list);
  }
  getQuantity(){
    let quantity = 0;
    for(let i = 0; i < this.list.length; i += 1){
      quantity += this.list[i].quantity;
    }
    return quantity;
  }
  calculateListTotal(list) {
    if(!list){
      return null;
    }
    const amounts = list.map((item) => item.FinalPrice);
    this.total = amounts.reduce((sum, item) => sum + item);
  }
  renderCartContents() {

    const cartItems = getLocalStorage(this.key);

    if (cartItems != null) {
      const htmlItems = cartItems.map((item) => shoppingCartTemplate(item));
      document.querySelector(this.parentSelector).innerHTML = htmlItems.join("");
      document.querySelector(".cart-total").innerText += ` $${this.total}`;
    }
    else {
      let div = document.createElement("div");
      let p = document.createElement("p");
      p.innerText = "Your cart is empty."
      div.appendChild(p);
      document.querySelector(".products").insertBefore(div, document.querySelector(this.parentSelector));

    }
  }

}

 function calculateInCart() {
   const cartItems = getLocalStorage("so-cart");
   let myTotal = 0;
   if (cartItems > 0) {
    //create an object to use calculateOrderTotal object.calculateOrderTotal
     myTotal = cartItems.calculateOrderTotal();
   }
   return myTotal;
 }

 //??????????????
  let total = calculateInCart();
