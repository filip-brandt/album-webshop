import "./styles/style.scss";
import products from "./products.mjs";
import { initForm } from "./orderForm.mjs";

// cart empty as default
const cart = [];

// Create a copy of the products array to hold filtered products
let filteredProducts = Array.from(products);

// Select the products listing container in the DOM
const productsListing = document.querySelector("#products");

// sort and filter buttons variables
const filterBtnShowAll = document.querySelector("#filterBtnShowAll");
const filterBtn70s = document.querySelector("#filterBtn70s");
const filterBtn80s = document.querySelector("#filterBtn80s");
const filterBtn90s = document.querySelector("#filterBtn90s");
const sortBtnName = document.querySelector("#sortBtnName");
const sortBtnPrice = document.querySelector("#sortBtnPrice");
const sortBtnRating = document.querySelector("#sortBtnRating");

// Add click event listeners to filter and sort buttons
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
  let subtotal = 0;
  let totalProducts = 0;
  const surcharge = weekendSurcharge();

  for (let i = 0; i < cart.length; i++) {
    const product = cart[i];
    totalProducts += product.amount;

    let pricePerProduct = product.price;

    const discount = productAmountDiscount(product);
    pricePerProduct -= discount;

    pricePerProduct = pricePerProduct * (1 + surcharge);

    subtotal += pricePerProduct * product.amount;
  }

  const mondayDiscountAmount = mondayDiscount(subtotal);
  const totalAfterDiscount = subtotal - mondayDiscountAmount;

  const shippingCost = calcShippingCost(subtotal, totalProducts);

  const total = totalAfterDiscount + shippingCost;

  disableInvoiceForHighTotalCost(total);

  let html = `subtotal: ${subtotal.toFixed(2)} Kr<br/>`;

  if (mondayDiscountAmount > 0) {
    html += `<span class="discount">Monday discount: -${mondayDiscountAmount.toFixed(
      2
    )} Kr</span><br/>`;
  }

  html += `Shipping: ${
    shippingCost === 0 ? "Free" : shippingCost.toFixed(2) + " Kr"
  }<br/>`;
  html += `<strong>Total: ${total.toFixed(2)} Kr</strong>`;

  cartTotalElement.innerHTML = html;

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
  const surcharge = weekendSurcharge();

  for (let i = 0; i < cart.length; i++) {
    const product = cart[i];

    let pricePerProduct = product.price;
    const discount = productAmountDiscount(product);
    pricePerProduct -= discount;

    pricePerProduct = pricePerProduct * (1 + surcharge);

    let discountMessage =
      product.amount >= 10 ? ` (10% discount for bundle)` : "";

    cartSection.innerHTML += `
    <article>
    ${product.name}: ${pricePerProduct.toFixed(2)} Kr/st${discountMessage}
    <button data-id="${product.id}" class="decrease-cart-product">-</button>
    ${product.amount} st
    <button data-id="${product.id}" class="increase-cart-product">+</button>
    <button data-id="${product.id}" class="delete-cart-product">Remove</button>
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

// order clearing due to inactivity
const SLOWNESS_TIMER_MINUTES = 15;
let orderTimer;

function startOrderTimer() {
  orderTimer = setTimeout(clearOrder, 1000 * 60 * SLOWNESS_TIMER_MINUTES);
}

function clearOrder() {
  cart.length = 0; // Clear the cart array
  updateCartTotals();
  printCart();
  alert(
    "Your order has been cleared due to inactivity. Please add products to your cart again."
  );
}

// functions for discounts and added costs
function mondayDiscount(subtotal) {
  const date = new Date();
  const MONDAY = 1;

  if (date.getDay() === MONDAY && date.getHours() < 10) {
    return subtotal * 0.1; // Apply 10% discount
  }

  return 0; // No discount
}

function weekendSurcharge() {
  const date = new Date();
  const day = date.getDay();
  const hour = date.getHours();

  if (day === 5 && hour >= 15) return 0.15;
  if (day === 6 || day === 0) return 0.15;
  if (day === 1 && hour < 3) return 0.15;

  return 0;
}

function calcShippingCost(subtotal, totalProducts) {
  if (totalProducts > 15) {
    return 0; // Free shipping for more than 15 products
  }
  return 25 + subtotal * 0.1;
}

function productAmountDiscount(product) {
  if (product.amount >= 10) {
    return product.price * 0.1;
  }
  return 0;
}

// function to disable invoice option for high total cost
function disableInvoiceForHighTotalCost(cartTotal) {
  // used 5000 instead of 800 due to high product prices
  if (cartTotal > 5000) {
    const radioInvoice = document.querySelector('input[value="invoice"]');
    radioInvoice.disabled = true;
    if (radioInvoice.checked) {
      const radioCard = document.querySelector('input[value="card"]');
      radioCard.checked = true;
    }
  } else {
    const radioInvoice = document.querySelector('input[value="invoice"]');
    radioInvoice.disabled = false;
  }
}

// order/reset button messages
const orderBtn = document.querySelector("#orderBtn");
orderBtn.addEventListener("click", processOrder);

function processOrder(e) {
  e.preventDefault();

  let orderSummary = "Order confirmed!\n\n";
  orderSummary += "Products ordered:\n";

  for (let i = 0; i < cart.length; i++) {
    const product = cart[i];
    orderSummary += `- ${product.name}: ${product.amount} st\n`;
  }

  orderSummary += `\nEstimated delivery time: 3-5 business days.\n`;
  orderSummary += `Thank you for shopping with us!`;

  alert(orderSummary);

  window.location.href = window.location.href;
}

const resetBtn = document.querySelector("#resetBtn");
resetBtn.addEventListener("click", resetOrder);
function resetOrder(e) {
  const confirmReset = confirm(
    "Are you sure you want to clear your order? This action cannot be undone."
  );
  if (!confirmReset) {
    e.preventDefault();
    return;
  }
}

// Initial print of all products when page loads
printProducts();

// Initialize the order form validation
initForm();

// Start the order inactivity timer
startOrderTimer();
