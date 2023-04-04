import { getLocalStorage,
  } from "./utils.mjs";
  import ExternalServices from "./ExternalServices.mjs";

  const services = new ExternalServices();
  function formDataToJSON(formElement) {
    const formData = new FormData(formElement),
      convertedJSON = {};

    formData.forEach(function (value, key) {
      convertedJSON[key] = value;
    });

    return convertedJSON;
  }

//   function packageItems(items) {
//     // const simplifiedItems = null;

//     if (items){
//       return items.map((item) => {
//         console.log(item);
//         return {
//           id: item.Id,
//           price: item.FinalPrice,
//           name: item.Name,
//           quantity: 1,
//         };
//       });
//     }
//     // return simplifiedItems;
//   }

  export default class CheckoutProcess {
    constructor(key, outputSelector) {

      this.key = key;
      this.outputSelector = outputSelector;
      this.list = [];
      this.itemTotal = 0;
      this.orderTotal = 0;
    }
    init() {
      this.list = getLocalStorage(this.key);
      this.calculateItemSummary();
    }
    calculateItemSummary() {
      const summaryElement = document.querySelector(
        this.outputSelector + " #cart-total"
      );
      const itemNumElement = document.querySelector(
        this.outputSelector + " #number-items"
      );

      if (itemNumElement > 0){
        itemNumElement.innerText = this.list.length;
        // calculate the total of all the items in the cart
      const amounts = this.list.map((item) => item.FinalPrice);
      this.itemTotal = amounts.reduce((sum, item) => sum + item);
      summaryElement.innerText = "$" + this.itemTotal;

      }


    }
    calculateOrdertotal() {
        this.orderTotal = (parseFloat(this.itemTotal)).toFixed(2);
        this.displayOrderTotals();
      }
      displayOrderTotal() {
        const orderTotal = document.querySelector(this.outputSelector + " #order-total");
        orderTotal.innerText = "$" + this.orderTotal;
       }
    // async checkout() {
    //   const formElement = document.forms["checkout"];

    //   const json = formDataToJSON(formElement);
    //   // add totals, and item details
    //   json.orderDate = new Date();
    //   json.orderTotal = this.orderTotal;
    //   json.tax = this.tax;
    //   json.shipping = this.shipping;
    //   json.items = packageItems(this.list);
    //   console.log(json);
    //   try {
    //     const res = await services.checkout(json);
    //     console.log(res);
    //     setLocalStorage("so-cart", []);
    //     window.location.assign("/checkout/success.html");
    //   } catch (err) {
    //     removeAllAlerts();
    //     for (let message in err.message) {
    //       alertMessage(err.message[message]);
    //     }

    //     console.log(err);
    //   }
    // }
  }