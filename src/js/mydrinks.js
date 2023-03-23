
let myDrinks = window.localStorage.getItem("myDrinks");
if (myDrinks != '') {
    document.getElementById('drink-total').innerHTML = myDrinks;
}