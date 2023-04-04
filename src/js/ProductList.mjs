
import { renderListWithTemplate } from "./utils.mjs";

// ProductList.mjs
function productCardTemplate(product) {
  //const imageURL = window.location.origin + "/public/images/";
  const imageURL = "/images/";
  return `<li class="product-card">
  <a href="/product_pages/index.html?product=${product.Id}">
  <img
    src="${imageURL + product.Image}"
    alt="Image of ${product.Name}"
  />
  <h2 class="card__name">${product.Name}</h2>
  <p class="product-card__price">$${product.FinalPrice}</p></a>
  <button id="add-to-cart">Buy now</button>
  <p></a>
</li>`
}

// function carItemTemplate(product)
// {
//   const newList = document.createElement("li")
//   newList.innerHTML = `
//   <p id="tag"> ${product.Name}: $${product.FinalPrice}: 
//     <button id="delete-button">
//       <span>Remove Item</span>
//     </button>
//   </p>`
//   findListOfItems.append(newList)
// }

export default class ProductListing {
  constructor(category, dataSource, listElement) {
    // We passed in this information to make our class as reusable as possible.
    // Being able to define these things when we use the class will make it very flexible
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }
  async init() {
    // our dataSource will return a Promise...so we can use await to resolve it.
    const list = await this.dataSource.getData(this.category);
    // render the list
    this.renderList(list);
    //set the title to the current category
    document.querySelector(".product-title").innerHTML = this.category;
  }
  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}


