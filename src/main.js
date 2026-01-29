import "./styles/style.scss";
import products from "./products.mjs";

// cart
const cart = [];

// Create a copy of the products array to hold filtered products
let filteredProducts = Array.from(products);
// Select the products listing container in the DOM
const productsListing = document.querySelector("#products");

// Make buttons interactive
const filterBtnShowAll = document.querySelector("#filterBtnShowAll");
const filterBtn70s = document.querySelector("#filterBtn70s");
const filterBtn80s = document.querySelector("#filterBtn80s");
const filterBtn90s = document.querySelector("#filterBtn90s");
const sortBtnName = document.querySelector("#sortBtnName");
const sortBtnPrice = document.querySelector("#sortBtnPrice");
const sortBtnRating = document.querySelector("#sortBtnRating");

// Add click events to buttons
filterBtnShowAll.addEventListener("click", showAllProducts);
filterBtn70s.addEventListener("click", filterProductsBy70s);
filterBtn80s.addEventListener("click", filterProductsBy80s);
filterBtn90s.addEventListener("click", filterProductsBy90s);
sortBtnName.addEventListener("click", sortProductsByName);
sortBtnPrice.addEventListener("click", sortProductsByPrice);
sortBtnRating.addEventListener("click", sortProductsByRating);

// Function to reset the filteredProducts array to include all products and print them
function showAllProducts() {
  filteredProducts = Array.from(products);
  printProducts();
}

// Functions to change the array to only include filtered products and print them
function filterProductsBy70s() {
  filteredProducts = products.filter((product) => product.category === "70s");
  printProducts();
}

function filterProductsBy80s() {
  filteredProducts = products.filter((product) => product.category === "80s");
  printProducts();
}

function filterProductsBy90s() {
  filteredProducts = products.filter((product) => product.category === "90s");
  printProducts();
}

// Functions to sort the filteredProducts array and print it
function sortProductsByName() {
  filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
  printProducts();
}

function sortProductsByPrice() {
  filteredProducts.sort((a, b) => a.price - b.price);
  printProducts();
}

function sortProductsByRating() {
  filteredProducts.sort((a, b) => b.rating - a.rating);
  printProducts();
}

// Function to print products to the DOM
function printProducts() {
  // Clear the current products listing so content doesn't stack up after each function run
  productsListing.innerHTML = "";

  let html = "";

  // Keeps adding a product until index reaches length of filteredProducts
  for (let i = 0; i < filteredProducts.length; i++) {
    const currentProduct = filteredProducts[i];

    // Adds HTML content for each product
    html += `
    <article>
    <h3>${currentProduct.name}</h3>
    <figure>
    <img src="${currentProduct.img}" alt="${currentProduct.name}" width="250" height="250" loading="lazy" />
    </figure>
    <div class="metadata">
      <span>Rating: ${currentProduct.rating} / 5</span>
      <span>Release: ${currentProduct.release}</span>
      <span>Price: ${currentProduct.price} SEK</span>
    </div>
    <button class="decrease" data-id="${currentProduct.id}">-</button>
    <input type="number" value="0" min="0" id="amount-${currentProduct.id}" disabled/>
    <button class="increase" data-id="${currentProduct.id}">+</button>
    <button class="buy" data-id="${currentProduct.id}">Add to cart</button>
  </article>
    `;
  }

  productsListing.innerHTML = html;

  // Event listeners for amount and buy buttons
  const buyButtons = document.querySelectorAll("#products button.buy");
  buyButtons.forEach((btn) => {
    btn.addEventListener("click", addProductToCart);
  });

  const increaseButtons = document.querySelectorAll(
    "#products button.increase"
  );
  increaseButtons.forEach((btn) => {
    btn.addEventListener("click", increaseProductCount);
  });

  const decreaseButtons = document.querySelectorAll(
    "#products button.decrease"
  );
  decreaseButtons.forEach((btn) => {
    btn.addEventListener("click", decreaseProductCount);
  });
}

// Increase product count function
function increaseProductCount(e) {
  const clickedBtnId = e.target.dataset.id;
  const input = document.querySelector(`#amount-${clickedBtnId}`);
  input.value = Number(input.value) + 1;
}

// Decrease product count function
function decreaseProductCount(e) {
  const clickedBtnId = e.target.dataset.id;
  const input = document.querySelector(`#amount-${clickedBtnId}`);

  // Decrease the amount but do not allow it to go below 0
  let amount = Number(input.value) - 1;
  if (amount < 0) {
    amount = 0;
  }
  input.value = amount;
}

// Function to add products to cart
function addProductToCart(e) {
  const clickedBtnId = Number(e.target.dataset.id);
  const product = products.find((product) => product.id === clickedBtnId);

  // Do nothing if product is not found
  if (product === undefined) {
    return;
  }

  // Get the amount from the corresponding input field
  const inputField = document.querySelector(`#amount-${clickedBtnId}`);
  let amount = Number(inputField.value);

  // Do not add to cart if amount is less than 0 or equal to 0
  if (amount <= 0) {
    return;
  }

  inputField.value = 0; // Reset input field to 0 after adding to cart

  // Check if product is already in cart
  const index = cart.findIndex((product) => product.id === clickedBtnId);
  if (index === -1) {
    // If not in cart, add new product with amount to cart array
    cart.push({ ...product, amount: amount });
  } else {
    // If already in cart, update the amount of the existing product
    cart[index].amount += amount;
  }

  updateCartTotals();

  printCart();
}

// Function to calculate cart total price
const cartTotalElement = document.querySelector("#cartTotal");
function updateCartTotals() {
  let cartTotal = 0;
  for (let i = 0; i < cart.length; i++) {
    const productSum = cart[i].price * cart[i].amount;
    cartTotal += productSum;
  }

  cartTotalElement.innerHTML = `${cartTotal} Kr`;

  highlightCartTotalChange();
}

// Function to visually highlight cart total change
function highlightCartTotalChange() {
  cartTotalElement.classList.add("highlight-price");

  const SECONDS_IN_MS = 1000;
  const SECONDS = 1;
  setTimeout(removeCartTotalHighlight, SECONDS_IN_MS * SECONDS);
}

function removeCartTotalHighlight() {
  cartTotalElement.classList.remove("highlight-price");
}

const cartSection = document.querySelector("#cart");

// Function to print cart contents
function printCart() {
  cartSection.innerHTML = "";

  for (let i = 0; i < cart.length; i++) {
    cartSection.innerHTML += `
    <article>
    ${cart[i].name}:
    <button data-id="${cart[i].id}" class="decrease-cart-product">-</button>
    ${cart[i].amount} st
    <button data-id="${cart[i].id}" class="increase-cart-product">+</button>
    <button data-id="${cart[i].id}" class="delete-cart-product">Remove</button>
    </article>
    `;
  }

  // Event listeners for cart buttons
  const deleteButtons = document.querySelectorAll("button.delete-cart-product");
  deleteButtons.forEach((btn) => {
    btn.addEventListener("click", deleteProductFromCart);
  });

  const cartDecreaseButtons = document.querySelectorAll(
    "button.decrease-cart-product"
  );
  cartDecreaseButtons.forEach((btn) => {
    btn.addEventListener("click", decreaseProductFromCart);
  });

  const cartIncreaseButtons = document.querySelectorAll(
    "button.increase-cart-product"
  );
  cartIncreaseButtons.forEach((btn) => {
    btn.addEventListener("click", increaseProductFromCart);
  });
}

// function to decrease product amount in cart
function decreaseProductFromCart(e) {
  const rowId = Number(e.target.dataset.id);

  const product = cart.find((product) => product.id === rowId);

  // Do nothing if amount is already 0
  if (product.amount <= 0) {
    return;
  }

  // Decrease amount by 1
  product.amount -= 1;

  updateCartTotals();
  printCart();
}

// function to increase product amount in cart
function increaseProductFromCart(e) {
  const rowId = Number(e.target.dataset.id);

  const product = cart.find((product) => product.id === rowId);

  product.amount += 1;

  updateCartTotals();
  printCart();
}

// function to delete product from cart
function deleteProductFromCart(e) {
  const rowId = Number(e.target.dataset.id);
  const index = cart.findIndex((product) => product.id === rowId);
  if (index !== -1) {
    cart.splice(index, 1);
  }
  updateCartTotals();
  printCart();
}

// Initial print of all products when page loads
printProducts();
