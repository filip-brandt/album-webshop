import "./style.css";
import products from "./products.mjs";

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

  // Keeps adding a product until index reaches length of filteredProducts
  for (let i = 0; i < filteredProducts.length; i++) {
    const currentProduct = filteredProducts[i];

    // Adds HTML content for each product
    const html = `
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
  </article>
    `;

    // Prevents overwriting by adding to the existing HTML content
    productsListing.innerHTML += html;
  }
}

// Initial print of all products when page loads
printProducts();
