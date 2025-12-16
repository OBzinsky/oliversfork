// Get all the items and the cart area
const items = document.querySelectorAll(".item");
const cart = document.getElementById("cart");

// Instead of creating dynamically, just grab the existing total element
const cartTotal = document.getElementById("cart-total");

let totalPrice = 0;

// Loop through each item
items.forEach(function(item, i) {
    const name = item.dataset.name;
    const minusBtn = item.querySelector(".minus");
    const plusBtn = item.querySelector(".plus");
    const countDisplay = item.querySelector(".count");

    // Extract price from item-info text
    const priceText = item.querySelector(".item-info").innerText.match(/€([0-9]+\.[0-9]+)/);
    const price = priceText ? parseFloat(priceText[1]) : 0;

    let count = 0;

    // Create cart line in HTML instead of JS (optional)
    const cartItem = document.querySelectorAll(".cart-item")[i];

    function updateItem(action) {
        if (action === "plus") {
            if (count === 0) {
                cartItem.classList.add("active");
            }
            count++;
            totalPrice += price;
        } else if (action === "minus") {
            if (count > 0) {
                count--;
                totalPrice -= price;
                if (count === 0) {
                    cartItem.classList.remove("active");
                }
            }
        }
        countDisplay.innerText = count;
        if (count > 0) {
            cartItem.innerText = `${name} x${count}`;
        }
        updateTotal();
    }

    plusBtn.onclick = () => updateItem("plus");
    minusBtn.onclick = () => updateItem("minus");
});

// Function to update total price
function updateTotal() {
    cartTotal.innerText = "Total: €" + totalPrice.toFixed(2);
}