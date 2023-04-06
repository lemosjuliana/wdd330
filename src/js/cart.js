import ShoppingCart from "./ShoppingCart.js";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const cart = new ShoppingCart(".product-list");
cart.init();
if (cart.total > 0) {
  // show our checkout button and total if there are items in the cart.
  document.querySelector(".list-footer").classList.remove("hide");
}

window._increaseQty = function _increaseQty(id) {
  cart.increaseQty(id);
  cart.init();
}

window._decreaseQty = function _decreaseQty(id) {
  cart.decreaseQty(id);
  cart.init();
}

window._deleteItem = function _deleteItem(id) {
  cart.deleteItem(id);
  cart.init();
}

