let cart = [];
let total = 0;

function initCartSystem() {
    const cartContainer = document.getElementById("cart-items");
    const totalDisplay = document.getElementById("cart-total");

    document.querySelectorAll(".add-to-cart").forEach((btn, index) => {
        btn.addEventListener("click", function () {
            const item = document.querySelectorAll(".menu-item")[index];
            const name = item.querySelector("h1").innerText;

            let priceText = "";

            const select = item.querySelector("select");

            if (select && select.value !== "Select") {
                const match = select.value.match(/(\d+(\.\d+)?)/);
                if (match) priceText = match[0];
            }

            if (!priceText) {
                const basePriceText = item.querySelector(".price").innerText;
                const match = basePriceText.match(/(\d+(\.\d+)?)/);
                if (match) priceText = match[0];
            }

            const price = parseFloat(priceText);

            const option = select ? select.value : "Default";

            if (select && select.value === "Select") {
                alert("Please choose an option first!");
                return;
            }

            cart.push({ name, option, price });
            total += price;

            updateCart();
        });
    });

    function updateCart() {
        cartContainer.innerHTML = "";

        cart.forEach(item => {
            const li = document.createElement("li");
            li.innerText = `${item.name} (${item.option}) - €${item.price.toFixed(2)}`;
            cartContainer.appendChild(li);
        });

        totalDisplay.innerText = total.toFixed(2);
    }
}

document.addEventListener("DOMContentLoaded", initCartSystem);
