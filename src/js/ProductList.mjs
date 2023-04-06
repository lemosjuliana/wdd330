
import { getLocalStorage, renderListWithTemplate, setLocalStorage } from "./utils.mjs";

export function addToCart (id, name, price) {
  let cart = getLocalStorage(id);
  if (cart != null && 'id' in cart) {
      cart.qty ++;
  } else {
      let item = {
        id: id, 
        name: name,
        price: Number(price),       
        qty: 1
      }
      cart = item;
  }
  setLocalStorage(id, cart);
  window.location.href="/cart/index.html";
}

function productCardTemplate(product) {
  const imageURL = "/images/";
  return `<li class="product-card">
  <img
    src="${imageURL + product.Image}"
    alt="Image of ${product.Name}"
  />
  <h2 class="product-name">${product.Name}</h2>
  <p class="product-price">$${product.FinalPrice}</p></a>
  <button class="add-cart-button" title="Buy this product" id="${product.Id}"onclick="_addToCart('${product.Id}','${product.Name}', '${product.FinalPrice}')">Add To Cart</button>
  <p>
</li>`
}

export class ProductListing {
  constructor(dataSource, listElement) {
    // We passed in this information to make our class as reusable as possible.
    // Being able to define these things when we use the class will make it very flexible
    this.dataSource = dataSource;
    this.listElement = listElement;
  }
  async init() {
    // our dataSource will return a Promise...so we can use await to resolve it.
    const list = await this.dataSource.getData();
    // render the list
    this.renderList(list);
  }
  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}


