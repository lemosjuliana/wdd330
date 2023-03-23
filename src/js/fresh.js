
const url = 'https://brotherblazzard.github.io/canvas-content/fruit.json';
let fruits = [];
let myDrinks = Number(window.localStorage.getItem("myDrinks"));

// SELECT FRUIT

// Creates and displays select elements

async function getFruits()
{
    const response = await fetch(url);
    let data;
    if (response.ok) {
        data = await response.json();
        fruits = data;
    }
    displayResults(data);
}

function displayResults(fruitData) 
{
    const fruitsSelect1 = document.createElement('select');
    const fruitsSelect2 = document.createElement('select');
    const fruitsSelect3 = document.createElement('select');

    fruitData.forEach(fruit => {
        fruitsSelect1.setAttribute('name', 'fruits');
        fruitsSelect1.classList.add('fruits-select');
        fruitsSelect1.classList.add('input-box');
        const fruitToAdd = document.createElement('option');
        fruitToAdd.setAttribute('value', fruit.name);
        fruitToAdd.textContent = fruit.name;
        fruitsSelect1.appendChild(fruitToAdd);
        });

        fruitData.forEach(fruit => {
            fruitsSelect2.setAttribute('name', 'fruits');
            fruitsSelect2.classList.add('fruits-select');
            fruitsSelect2.classList.add('input-box');       
            const fruitToAdd = document.createElement('option');
            fruitToAdd.setAttribute('value', fruit.name);
            fruitToAdd.textContent = fruit.name;
            fruitsSelect2.appendChild(fruitToAdd);
        });

        fruitData.forEach(fruit => {
            fruitsSelect3.setAttribute('name', 'fruits');
            fruitsSelect3.classList.add('fruits-select');
            fruitsSelect3.classList.add('input-box');
            const fruitToAdd = document.createElement('option');
            fruitToAdd.setAttribute('value', fruit.name);
            fruitToAdd.textContent = fruit.name;
            fruitsSelect3.appendChild(fruitToAdd);
        });
        
   
    const dropdowns = document.getElementById('fruit-selector');

    fruitsSelect1.setAttribute('id', 'fruits1');
    fruitsSelect1.setAttribute('name', 'fruits1');
    dropdowns.appendChild(fruitsSelect1);
    dropdowns.appendChild(document.createElement('br'));

    fruitsSelect2.setAttribute('id', 'fruits2');
    fruitsSelect2.setAttribute('name', 'fruits2');
    dropdowns.appendChild(fruitsSelect2);
    dropdowns.appendChild(document.createElement('br'));

    fruitsSelect3.setAttribute('id', 'fruits3');
    fruitsSelect3.setAttribute('name', 'fruits3');
    dropdowns.appendChild(fruitsSelect3);
    dropdowns.appendChild(document.createElement('br'));
}

// Gives the information about the created drink
function showOutput(list = fruits)
{
    const base = document.getElementById('output');
    base.innerHTML = '';
    let fats = 0;
    let sugars = 0;
    let calories = 0;
    let carbs = 0;
    let proteins = 0;
    

    const fruit1 = document.getElementById('fruits1').value;
    const fruit2 = document.getElementById('fruits2').value;
    const fruit3 = document.getElementById('fruits3').value;

    fruits.forEach(fruit => {
        if(fruit.name == fruit1 || fruit.name == fruit2 || fruit.name == fruit3)
        {
            carbs += fruit.nutritions.carbohydrates;
            proteins += fruit.nutritions.protein;
            fats += fruit.nutritions.fat;
            sugars += fruit.nutritions.sugar;
            calories += fruit.nutritions.calories;
        }
        else
        {
            console.log("error");
        }
    });

    // Get all other form input values
    const orderDate = document.getElementById('date');
    orderDate.value = getDate();
    const orderDateValue = orderDate.value;
    const firstName = document.getElementById('firstName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const speciaInstructions = document.getElementById('instructions').value;

    //Create DOM Elements
    const dateE = document.createElement('p');
    const nameE = document.createElement('p');
    const emailE = document.createElement('p');
    const phoneE = document.createElement('p');
    const instructionsE = document.createElement('p');
    const fruit1E = document.createElement('p');
    const fruit2E = document.createElement('p');
    const fruit3E = document.createElement('p');

    // Creates elements for each nutrition fact
    const carbsE = document.createElement('p');
    const proteinsE = document.createElement('p');
    const fatsE = document.createElement('p');
    const sugarsE = document.createElement('p');
    const calorieCountE = document.createElement('p');

    //add the content
    dateE.innerHTML = `<strong>Date: </strong> ${getDate()}`;
    nameE.innerHTML = `<strong>First Name: </strong> ${firstName}`;
    emailE.innerHTML = `<strong>Email: </strong> ${email}`;
    phoneE.innerHTML = `<strong>Phone Number: </strong> ${phone}`;
    instructionsE.innerHTML = `<strong>Special Instructions:</strong><br> ${speciaInstructions}`;
    const lineBR1 = document.createElement('br');

    fruit1E.innerHTML = `<strong>Fruit #1: </strong> ${fruit1}`;
    fruit2E.innerHTML = `<strong>Fruit #2: </strong> ${fruit2}`;
    fruit3E.innerHTML = `<strong>Fruit #3: </strong> ${fruit3}`;
    const lineBR2 = document.createElement('br');
    
    fatsE.innerHTML = `<strong>Fats: </strong> ${fats}g`;
    sugarsE.innerHTML = `<strong>Sugars: </strong> ${sugars}g`;
    calorieCountE.innerHTML = `<strong>Calories: </strong> ${calories}`;
    carbsE.innerHTML = `<strong>Carbohydrates: </strong> ${carbs}g`;
    proteinsE.innerHTML = `<strong>Proteins: </strong> ${proteins}g`;
   

    const domEList = [dateE, nameE, emailE, phoneE, instructionsE, lineBR1, fruit1E, fruit2E, fruit3E, lineBR2, calorieCountE, carbsE, proteinsE, fatsE, sugarsE];
    domEList.forEach(element => {
        base.appendChild(element);
    }); 
    myDrinks += 1;
    drinkCount();

    document.getElementById('fresh-form').reset();
}

function drinkCount()
{
    localStorage.setItem("myDrinks", myDrinks);
}
function getDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();
  
    if(dd<10) 
    {
        dd = '0' + dd
    } 
  
    if(mm<10) 
    {
        mm = '0' + mm
    } 
    today = yyyy + '/' + mm + '/' + dd;
    return today;
 }

getFruits(url);
document.getElementById('submit-btn').addEventListener('click', showOutput);

