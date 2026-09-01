const orderButtons = document.querySelectorAll(".menu-card button");
const orderList = document.getElementById("order-list");
const orderTotal = document.getElementById("order-total");
const clearOrder = document.getElementById("clear-order");

let orders = [];

orderButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const card = button.closest(".menu-card");
        const foodName = card.querySelector("h3").textContent;
        const priceText = card.querySelector("h4").textContent;
        const price = Number(priceText.replace("KSh ", ""));

        const existingOrder = orders.find(function(order) {
            return order.name === foodName;
        });

        if (existingOrder) {
            existingOrder.quantity++;
        } else {
            orders.push({
                name: foodName,
                price: price,
                quantity: 1
            });
        }

        displayOrders();
    });

});


function displayOrders() {

    orderList.innerHTML = "";

    let total = 0;

    orders.forEach(function(order, index) {

        const item = document.createElement("div");

        item.className = "order-item";

        item.innerHTML = `
            <p>
                ${order.name} - KSh ${order.price}
                × ${order.quantity}
            </p>

            <button onclick="decreaseItem(${index})">➖</button>
            <button onclick="increaseItem(${index})">➕</button>
            <button onclick="removeItem(${index})">🗑️</button>
        `;

        orderList.appendChild(item);

        total += order.price * order.quantity;
    });

    if (orders.length === 0) {
        orderList.innerHTML = "<p>No items added yet.</p>";
    }

    orderTotal.textContent = total;
}


function increaseItem(index) {
    orders[index].quantity++;
    displayOrders();
}


function decreaseItem(index) {

    if (orders[index].quantity > 1) {
        orders[index].quantity--;
    } else {
        orders.splice(index, 1);
    }

    displayOrders();
}


function removeItem(index) {
    orders.splice(index, 1);
    displayOrders();
}


clearOrder.addEventListener("click", function() {

    orders = [];

    displayOrders();

});
const orderForm = document.getElementById("order-form");

orderForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const customerName = document.getElementById("customer-name").value;
    const customerPhone = document.getElementById("customer-phone").value;
    const customerLocation = document.getElementById("customer-location").value;

    if (orders.length === 0) {
        alert("Please add at least one meal to your order 🍱");
        return;
    }

    alert(
        "Thank you, " + customerName + "! 🎉\n\n" +
        "Your Lunchbox order has been placed successfully! 🍱\n" +
        "Phone: " + customerPhone + "\n" +
        "Delivery: " + customerLocation
    );

    orderForm.reset();

    orders = [];

    displayOrders();

});
