import { renderListWithTemplate } from "./utils.mjs";

// ProductList.mjs
function productCardTemplate(product) {
  let discount = (((product.FinalPrice - product.SuggestedRetailPrice) / product.SuggestedRetailPrice) * 100) 
  let discountRounded = Math.round(discount)

  return `<li class="product-card">
  <a href="/product_pages/index.html?product=${product.Id}">
  <img
    src="${product.Images.PrimaryMedium}"
    alt="Image of ${product.Name}"
  />
  <h3 class="card__brand">${product.Brand.Name}</h3>
  <h2 class="card__name">${product.Name}</h2>
  <p class="product-card_discount_list">-${discountRounded}% OFF</p></a>
  <p class="product-card__price">$${product.FinalPrice}</p></a>
</li>`
} 

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
