import { deleteLocalStorage, getLocalStorage, setLocalStorage } from "./utils.mjs";


function shoppingCartTemplate(item) {
  return `
    <tr>
        <td><b>${item.name}</b></td>
        <td>Price: $${item.price.toFixed(2)}</td>
        <td>Qty: ${item.qty}</td>
        <td>Subtotal: $${(item.price * item.qty).toFixed(2)}</td>
        <td style="width:20px"><button title="Increase quantity" class="clear-cart-button" type="button" onclick=_increaseQty('${item.id}')>+</button></td>
        <td style="width:20px"><button title="Decrease quantity" class="clear-cart-button" type="button" onclick=_decreaseQty('${item.id}')>-</button></td>
        <td style="width:20px"><button title="Delete item from cart" class="clear-cart-button" type="button" onclick=_deleteItem('${item.id}')>x</button></td>
    </tr>
  `;
}

export default class ShoppingCart {
  
  constructor(parentSelector) {
    this.parentSelector = parentSelector;
    this.total = 0;
    this.list = [];
  }

  getCartList() {
    let arr = [];
    for (let i = 0; i < localStorage.length; i ++) {
      let cart = getLocalStorage(localStorage.key(i));     
      if (cart != null && ('id' in cart) && ('qty' in cart)) {
          arr.push(cart);
      }
    }
    return arr;
  }

  increaseQty (id) {
    let cart = getLocalStorage(id);
    if (cart != null) {
        cart.qty ++;
        setLocalStorage(id, cart);
    }
  }
  
  decreaseQty (id) {
    let cart = getLocalStorage(id);
    if (cart != null) {
        cart.qty--;
        if (cart.qty <= 0) {
            deleteLocalStorage(id)
        } else {
            setLocalStorage(id, cart); 
        }
    }
  }
  
  deleteItem(id) {
     deleteLocalStorage(id);
  }

  async init() {
    this.list = this.getCartList();
    this.calculateListTotal(this.list);
    this.renderCartContents(this.list);
  }

  getQuantity(){
    let quantity = 0;
    for(let i = 0; i < this.list.length; i ++){
      quantity += this.list[i].qty;
    }
    return quantity;
  }

  calculateListTotal(list) {
    if(!list){
      return;
    }
    const amounts = list.map((item) => item.qty * item.price);
    if (amounts.length > 0) {
        this.total = amounts.reduce((sum, item) => sum + item);
    } else {
        this.total = 0;
    }
  }
  
  renderCartContents() {
    const cartItems = this.getCartList();
    document.querySelector(".cart-total").innerText = "";
    if (cartItems.length > 0) {
      const htmlItems = cartItems.map((item) => shoppingCartTemplate(item));
      document.querySelector(this.parentSelector).innerHTML = htmlItems.join("");
      document.querySelector(".cart-total").innerText = `Total: $${this.total.toFixed(2)}`;
      document.getElementById("cart-table").style.display='block';
    }
    else {
      document.querySelector(".cart-total").innerText = "Your cart is empty";
      document.querySelector(this.parentSelector).innerHTML = "";
      document.getElementById("cart-table").style.display='none';
    }
  }

}


 