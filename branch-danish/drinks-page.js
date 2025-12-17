// Get all the items and the cart area
const items = document.querySelectorAll(".item");
const cart = document.getElementById("cart");

// Grab the existing total element
const cartTotal = document.getElementById("cart-total");

let totalPrice = 0;

items.forEach(function(item, i) {
  const name = item.dataset.name;
  const minusBtn = item.querySelector(".minus");
  const plusBtn = item.querySelector(".plus");
  const countDisplay = item.querySelector(".count");

  // Extract price from item-info text
  const match = item.querySelector(".item-info").innerText.split("€");
  const price = match[1] ? parseFloat(match[1]) : 0;

  let count = 0;

  // Find cart line by index; if missing, create it
  let cartItem = document.querySelectorAll(".cart-item")[i];
  if (!cartItem) {
    cartItem = document.createElement("p");
    cartItem.classList.add("cart-item");
    cartItem.innerText = `${name} x0`;
    cart.appendChild(cartItem);
  }

  function updateItem(action) {
    if (action === "plus") {
      if (count === 0) cartItem.classList.add("active");
      count++;
      totalPrice += price;
    } else if (action === "minus") {
      if (count > 0) {
        count--;
        totalPrice -= price;
        if (count === 0) cartItem.classList.remove("active");
      }
    }

    countDisplay.innerText = count;
    if (count > 0) cartItem.innerText = `${name} x${count}`;
    updateTotal();
  }

  plusBtn.onclick = () => updateItem("plus");
  minusBtn.onclick = () => updateItem("minus");
});

function updateTotal() {
  cartTotal.innerText = "Total: €" + totalPrice.toFixed(2);
}