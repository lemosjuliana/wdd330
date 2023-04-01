import { getLocalStorage, setLocalStorage, alertMessage } from "./utils.mjs";

//renderProductDetails() 
function renderProductDetailsOutside(product){

return `<section class="product-detail"> <h3>${product.Name}</h3>
  <h2 class="divider">${product.Name}</h2>
  <img
    class="divider"
    src="${product.Images}"
    alt="${product.Name}"
  />
  <p class="product-card__price">$${product.FinalPrice}</p>
  <div class="product-detail__add">
    <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
  </div> </section>`;
 
}

//constructor()
export default class ProductDetails{
  constructor(productId, dataSource){
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;

  }
  //init()
  async init() {

    // use our datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
    this.product = await this.dataSource.findProductById(this.productId);

    // once we have the product details we can render out the HTML
    this.renderProductDetails("main");

    // once the HTML is rendered we can add a listener to Add to Cart button
    // Notice the .bind(this). Our callback will not work if we don't include that line. Review the readings from this week on 'this' to understand why.
    document.getElementById("addToCart")
            .addEventListener("click", this.addToCart.bind(this));
  }

  //addToCart
  addToCart(){
    let cartContents = getLocalStorage("so-cart");
    if (!cartContents) {
      cartContents = [];
    }
    cartContents.push(this.product);
    setLocalStorage("so-cart", cartContents);
    alertMessage(`${this.product.NameWithoutBrand} added to cart!`);
  }

  renderProductDetails(selector){
    const element = document.querySelector(selector);
    element.insertAdjacentHTML(
      "afterBegin",
      renderProductDetailsOutside(this.product)
    );

  }

}

