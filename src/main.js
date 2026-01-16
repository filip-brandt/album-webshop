import "./style.css";

// Array with product objects
const products = [
  {
    name: "Queen",
    price: 99,
    rating: 2.0,
    year: 1973,
    category: "70s",
    img: "https://example.com/queen.jpg",
  },
  {
    name: "Queen II",
    price: 99,
    rating: 3.0,
    year: 1974,
    category: "70s",
    img: "https://example.com/queen2.jpg",
  },
  {
    name: "Sheer Heart Attack",
    price: 99,
    rating: 3.5,
    year: 1974,
    category: "70s",
    img: "https://example.com/sheerheartattack.jpg",
  },
  {
    name: "A Night at the Opera",
    price: 99,
    rating: 5.0,
    year: 1975,
    category: "70s",
    img: "https://example.com/anightattheopera.jpg",
  },
  {
    name: "A Day at the Races",
    price: 99,
    rating: 3.5,
    year: 1976,
    category: "70s",
    img: "https://example.com/adayattheraces.jpg",
  },
  {
    name: "News of the World",
    price: 99,
    rating: 4.5,
    year: 1977,
    category: "70s",
    img: "https://example.com/newsoftheworld.jpg",
  },
  {
    name: "Jazz",
    price: 99,
    rating: 3.0,
    year: 1978,
    category: "70s",
    img: "https://example.com/jazz.jpg",
  },
  {
    name: "The Game",
    price: 99,
    rating: 5.0,
    year: 1980,
    category: "80s",
    img: "https://example.com/thegame.jpg",
  },
  {
    name: "Flash Gordon",
    price: 99,
    rating: 1.0,
    year: 1980,
    category: "80s",
    img: "https://example.com/flashgordon.jpg",
  },
  {
    name: "Hot Space",
    price: 99,
    rating: 2.0,
    year: 1982,
    category: "80s",
    img: "https://example.com/hotspace.jpg",
  },
  {
    name: "The Works",
    price: 99,
    rating: 3.5,
    year: 1984,
    category: "80s",
    img: "https://example.com/theworks.jpg",
  },
  {
    name: "A Kind of Magic",
    price: 99,
    rating: 3.5,
    year: 1986,
    category: "80s",
    img: "https://example.com/akindofmagic.jpg",
  },
  {
    name: "The Miracle",
    price: 99,
    rating: 4.0,
    year: 1989,
    category: "80s",
    img: "https://example.com/themiracle.jpg",
  },
  {
    name: "Innuendo",
    price: 99,
    rating: 4.0,
    year: 1991,
    category: "90s",
    img: "https://example.com/innuendo.jpg",
  },
  {
    name: "Made in Heaven",
    price: 99,
    rating: 4.5,
    year: 1995,
    category: "90s",
    img: "https://example.com/madeinheaven.jpg",
  },
];

// Create a copy of the products array to hold filtered products
let filteredProducts = Array.from(products);
const productsListing = document.querySelector("#products");

// Make buttons interactive
const filterBtnShowAll = document.querySelector("#filterBtnShowAll");
const filterBtn70s = document.querySelector("#filterBtn70s");
const filterBtn80s = document.querySelector("#filterBtn80s");
const filterBtn90s = document.querySelector("#filterBtn90s");

// Add click events to buttons
filterBtnShowAll.addEventListener("click", showAllProducts);
filterBtn70s.addEventListener("click", filterProductsBy70s);
filterBtn80s.addEventListener("click", filterProductsBy80s);
filterBtn90s.addEventListener("click", filterProductsBy90s);

// Function to print all products to the DOM
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

// Function to print products to the DOM
function printProducts() {
  // Clear the current products listing so content doesn't stack up after each function run
  productsListing.innerHTML = "";

  for (let i = 0; i < filteredProducts.length; i++) {
    const currentProduct = filteredProducts[i];

    // Adds HTML content for each product
    const html = `
    <article>
    <h3>${currentProduct.name}</h3>
    <div class="metadata">
      <span>Price: ${currentProduct.price} SEK</span>
      <span>Rating: ${currentProduct.rating} / 5</span>
      <span>Year: ${currentProduct.year}</span>
    </div>
    <img src="${currentProduct.img}" alt="Album cover of ${currentProduct.name}" />
  </article>
    `;

    productsListing.innerHTML += html;
  }
}

// Initial print of all products when page loads
printProducts();
