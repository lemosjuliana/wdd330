
function countLocalStorageItems() {
  let totalQty = 0;
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const item = JSON.parse(localStorage.getItem(key));
    if (item && item.qty) {
      totalQty += item.qty;
    }
  }
  return totalQty;
}

const drinkTotalElem = document.getElementById("drink-total");
if (drinkTotalElem) {
  drinkTotalElem.innerHTML = countLocalStorageItems();
}

// function getProductCount() {
//   const myProducts = localStorage.getItem("myProducts");
//   if (myProducts) {
//     return parseInt(myProducts);
//   } else {
//     return 0;
//   }
// }

// const myProductsCount = getProductCount();
// if (myProductsCount !== 0) {
//   document.getElementById("drink-total").innerHTML = myProductsCount;
// }