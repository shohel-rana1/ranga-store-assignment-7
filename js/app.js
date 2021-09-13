const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  console.log(products);
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.images;
    // console.log(image);
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
      <div>
    <img class="product-image" src="https://fakestoreapi.com/img/${'81fPKd-2AYL._AC_SL1500_.jpg'}"></img>
      </div>
      <h3>${product.title.slice(0, 25)}</h3>
      <p>Category: ${product.category}</p>
      <h5>Ratings: ${product.rating.rate}</h5>
      <h5>Total Votes: ${product.rating.count}</h5>
      <h2>Price:${product.price}</h2>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
      <button id="details-btn" onclick="loadSingleItem(${products})" class="btn btn-primary">Details</button></div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};
//display single product
const loadSingleItem = () => {
  fetch('https://fakestoreapi.com/products/1')
    .then(res => res.json())
    .then(data => displaySingleProduct(data))
}
displaySingleProduct = (data) => {
  console.log(data);
  for (const item in data) {
    const singleItem = document.getElementById('single-item');
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <img class="card-img-top" src="https://fakestoreapi.com/img/${'81fPKd-2AYL._AC_SL1500_.jpg'}" alt="Card image cap">
    <div class="card-body">
    <h3>${item.title}</h3>
    <p>Category: ${item.category}</p>
    <h5>Ratings: ${item.rating.rate}</h5>
    <h5>Total Votes: ${item.rating.count}</h5>
    <h2>Price:${item.price}</h2>
    </div>
    `
    singleItem.appendChild(div);
  }

};
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);
  updateTotal();
  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseInt(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = Math.round(total);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = Math.round(value);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal;
};
