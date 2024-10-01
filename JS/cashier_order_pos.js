const menuData = [
    { id: 1, name: "Big Mac", price: 500.00, image: "ITEM_IMG/DC_202302_0005-999_BigMac_1564x1564-1_nutrition-calculator-tile.jpeg" },
    { id: 2, name: "Veggie Burger", price: 450.00, image: "ITEM_IMG/DC_202302_0004-999_DoubleCheeseburger_Alt_1564x1564-1_nutrition-calculator-tile.jpeg" },
    { id: 3, name: "Chicken Burger", price: 550.00, image: "ITEM_IMG/DC_202309_4282_QuarterPounderCheeseDeluxe_Shredded_1564x1564-1_nutrition-calculator-tile.jpeg" },
    { id: 4, name: "French Fries", price: 200.00, image: "ITEM_IMG/DC_202002_6050_SmallFrenchFries_Standing_1564x1564-1_nutrition-calculator-tile.jpeg" },
    { id: 5, name: "Soft Drink", price: 150.00, image: "ITEM_IMG/DC_202402_0521_MediumCoke_ContourGlassv1_1564x1564_nutrition-calculator-tile.jpeg" },
    { id: 6, name: "Milkshake", price: 300.00, image: "ITEM_IMG/DC_201907_1509_MediumChocolateShake_Glass_A1_1564x1564-1_nutrition-calculator-tile.jpeg" },
    { id: 7, name: "Spicy Burger", price: 250.00, image: "ITEM_IMG/DC_202012_0116_SpicyCrispyChicken_PotatoBun_1564x1564-1_nutrition-calculator-tile.jpeg" },
    { id: 8, name: "Crispy Chicken Burger", price: 850.00, image: "ITEM_IMG/DC_202012_0383_CrispyChickenSandwich_PotatoBun_1564x1564-1_nutrition-calculator-tile.jpeg" },
    { id: 9, name: "Spicy Double Chicken Burger", price: 1050.00, image: "ITEM_IMG/DC_202104_0100_DeluxeSpicyCrispyChickenSandwich_PotatoBun_1564x1564-1_nutrition-calculator-tile.jpeg" },
    { id: 10, name: "Sprite", price: 280.00, image: "ITEM_IMG/DC_202212_0721_MediumSprite_Glass_1564x1564-1_nutrition-calculator-tile.jpeg" },
    { id: 11, name: "MOS Water", price: 199.00, image: "ITEM_IMG/DC_202402_5474_DasaniBottledWater_1564x1564-1_nutrition-calculator-tile.jpeg" },
    { id: 12, name: "Latte", price: 300.00, image: "ITEM_IMG/DC_201906_7659_MediumIcedMocha_Glass_A1_832x472_nutrition-calculator-tile.jpeg" }
];

let orderItems = [];

document.addEventListener('DOMContentLoaded', function() {
    const menuItemsContainer = document.getElementById('menuItems');
    const orderItemsContainer = document.getElementById('orderItems');
    const totalAmountElement = document.getElementById('totalAmount');
    const placeOrderBtn = document.getElementById('placeOrderBtn');
    const searchInput = document.getElementById('searchInput');

    function renderMenuItems(items) {
        menuItemsContainer.innerHTML = items.map(item => `
            <div class="col-md-4 mb-4">
                <div class="menu-item">
                    <img src="${item.image}" alt="${item.name}" class="mb-2">
                    <h5>${item.name}</h5>
                    <p>LKR ${item.price.toFixed(2)}</p>
                    <button class="btn btn-burger btn-sm w-100" onclick="addToOrder(${item.id})">Add to Order</button>
                </div>
            </div>
        `).join('');
    }

    function renderOrderItems() {
        orderItemsContainer.innerHTML = orderItems.map(item => `
            <div class="order-item">
                <div class="order-item-details">
                    <span>${item.name} x${item.quantity}</span>
                </div>
                <div class="order-item-price">
                    <div>LKR ${(item.price * item.quantity).toFixed(2)}</div>
                </div>
                <i class="fas fa-times remove-item" onclick="removeFromOrder(${item.id})"></i>
            </div>
        `).join('');

        const total = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        totalAmountElement.innerHTML = `
            LKR ${total.toFixed(2)}
        `;
    }

    window.addToOrder = function(itemId) {
        const item = menuData.find(i => i.id === itemId);
        const existingItem = orderItems.find(i => i.id === itemId);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            orderItems.push({ ...item, quantity: 1 });
        }

        renderOrderItems();
    }

    window.removeFromOrder = function(itemId) {
        const itemIndex = orderItems.findIndex(i => i.id === itemId);
        if (itemIndex !== -1) {
            if (orderItems[itemIndex].quantity > 1) {
                orderItems[itemIndex].quantity -= 1;
            } else {
                orderItems.splice(itemIndex, 1);
            }
            renderOrderItems();
        }
    }

    placeOrderBtn.addEventListener('click', function() {
        if (orderItems.length === 0) {
            alert('Please add items to your order before placing it.');
            return;
        }
        alert('Order placed successfully!');
        orderItems = [];
        renderOrderItems();
    });

    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const filteredItems = menuData.filter(item => 
            item.name.toLowerCase().includes(searchTerm)
        );
        renderMenuItems(filteredItems);
    });

    renderMenuItems(menuData);
});