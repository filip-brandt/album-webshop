import "./style.css";

// Array with product objects
const products = [
  {
    name: "Queen",
    price: 309,
    rating: 2.0,
    release: 1973,
    category: "70s",
    img: "img/cover-queen.png",
  },
  {
    name: "Queen II",
    price: 349,
    rating: 3.0,
    release: 1974,
    category: "70s",
    img: "img/cover-queen-two.jpg",
  },
  {
    name: "Sheer Heart Attack",
    price: 369,
    rating: 3.5,
    release: 1974,
    category: "70s",
    img: "img/cover-sheer-heart-attack.png",
  },
  {
    name: "A Night at the Opera",
    price: 479,
    rating: 5.0,
    release: 1975,
    category: "70s",
    img: "img/cover-a-night-at-the-opera.png",
  },
  {
    name: "A Day at the Races",
    price: 369,
    rating: 3.5,
    release: 1976,
    category: "70s",
    img: "img/cover-a-day-at-the-races.jpg",
  },
  {
    name: "News of the World",
    price: 419,
    rating: 4.5,
    release: 1977,
    category: "70s",
    img: "img/cover-news-of-the-world.png",
  },
  {
    name: "Jazz",
    price: 329,
    rating: 3.0,
    release: 1978,
    category: "70s",
    img: "img/cover-jazz.png",
  },
  {
    name: "The Game",
    price: 479,
    rating: 5.0,
    release: 1980,
    category: "80s",
    img: "img/cover-the-game.png",
  },
  {
    name: "Flash Gordon",
    price: 259,
    rating: 1.0,
    release: 1980,
    category: "80s",
    img: "img/cover-flash-gordon.png",
  },
  {
    name: "Hot Space",
    price: 309,
    rating: 2.0,
    release: 1982,
    category: "80s",
    img: "img/cover-hot-space.png",
  },
  {
    name: "The Works",
    price: 389,
    rating: 3.5,
    release: 1984,
    category: "80s",
    img: "img/cover-the-works.png",
  },
  {
    name: "A Kind of Magic",
    price: 389,
    rating: 3.5,
    release: 1986,
    category: "80s",
    img: "img/cover-a-kind-of-magic.png",
  },
  {
    name: "The Miracle",
    price: 409,
    rating: 4.0,
    release: 1989,
    category: "80s",
    img: "img/cover-the-miracle.png",
  },
  {
    name: "Innuendo",
    price: 409,
    rating: 4.0,
    release: 1991,
    category: "90s",
    img: "img/cover-innuendo.png",
  },
  {
    name: "Made in Heaven",
    price: 429,
    rating: 4.5,
    release: 1995,
    category: "90s",
    img: "img/cover-made-in-heaven.jpg",
  },
];

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
    <img src="${currentProduct.img}" alt="Album cover of ${currentProduct.name}" />
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
