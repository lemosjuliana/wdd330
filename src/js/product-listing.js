import ExternalServices from "./ExternalServices.mjs";
import { ProductListing, addToCart } from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

//const category = getParam("category");
const dataSource = new ExternalServices();
const element = document.querySelector(".product-list");
const list = new ProductListing(dataSource, element);

list.init();

window._addToCart = function _addToCart(id, name, price) {
    addToCart(id, name, price);
}

//export { addx };

