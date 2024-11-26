const menuData = [
    { id: 1, name: "Big Mac", price: 500.00, image: "ITEM_IMG/DC_202302_0005-999_BigMac_1564x1564-1_nutrition-calculator-tile.jpeg" },
    { id: 2, name: "Veggie Burger", price: 450.00, image: "ITEM_IMG/DC_202302_0004-999_DoubleCheeseburger_Alt_1564x1564-1_nutrition-calculator-tile.jpeg" },
    { id: 3, name: "Chicken Burger", price: 550.00, image: "ITEM_IMG/DC_202309_4282_QuarterPounderCheeseDeluxe_Shredded_1564x1564-1_nutrition-calculator-tile.jpeg" },
    { id: 4, name: "Crispy Chicken Burger", price: 850.00, image: "ITEM_IMG/DC_202012_0383_CrispyChickenSandwich_PotatoBun_1564x1564-1_nutrition-calculator-tile.jpeg" },
    { id: 5, name: "Spicy Double Chicken Burger", price: 1050.00, image: "ITEM_IMG/DC_202104_0100_DeluxeSpicyCrispyChickenSandwich_PotatoBun_1564x1564-1_nutrition-calculator-tile.jpeg" },
    { id: 6, name: "Spicy Burger", price: 250.00, image: "ITEM_IMG/DC_202012_0116_SpicyCrispyChicken_PotatoBun_1564x1564-1_nutrition-calculator-tile.jpeg" },
    { id: 7, name: "Crispy Chicken Burger", price: 850.00, image: "ITEM_IMG/DC_202012_0383_CrispyChickenSandwich_PotatoBun_1564x1564-1_nutrition-calculator-tile.jpeg" },
    { id: 8, name: "Spicy Double Chicken Burger", price: 1050.00, image: "ITEM_IMG/DC_202104_0100_DeluxeSpicyCrispyChickenSandwich_PotatoBun_1564x1564-1_nutrition-calculator-tile.jpeg" },
    { id: 9, name: "Co-COla", price: 150.00, image: "ITEM_IMG/DC_202402_0521_MediumCoke_ContourGlassv1_1564x1564_nutrition-calculator-tile.jpeg" },
    { id: 10, name: "Sprite", price: 200.00, image: "ITEM_IMG/DC_202212_0721_MediumSprite_Glass_1564x1564-1_nutrition-calculator-tile.jpeg" },
    { id: 11, name: "Dr Pepper", price: 180.00, image: "ITEM_IMG/DC_201905_0421_MediumDrPepper_Glass_1564x1564-1_nutrition-calculator-tile.jpeg" },
    { id: 12, name: "Diet Coke", price: 150.00, image: "ITEM_IMG/DC_202112_0652_MediumDietCoke_Glass_1564x1564-1_nutrition-calculator-tile.jpeg" },
    { id: 13, name: "Fanta Orange", price: 180.00, image: "ITEM_IMG/DC_202212_1262_MediumFantaOrange_Glass_1564x1564-1_nutrition-calculator-tile.jpeg" },
    { id: 14, name: "Orange Lavaburst", price: 220.00, image: "ITEM_IMG/DC_202012_0621_MediumHi-COrange_1564x1564-1_nutrition-calculator-tile.jpeg" },
    { id: 15, name: "Milkshake", price: 300.00, image: "ITEM_IMG/DC_201907_1509_MediumChocolateShake_Glass_A1_1564x1564-1_nutrition-calculator-tile.jpeg" },
    { id: 16, name: "MOS Water", price: 80.00, image: "ITEM_IMG/DC_202402_5474_DasaniBottledWater_1564x1564-1_nutrition-calculator-tile.jpeg" },
    { id: 17, name: "French Fries", price: 200.00, image: "ITEM_IMG/DC_202002_6050_SmallFrenchFries_Standing_1564x1564-1_nutrition-calculator-tile.jpeg" },
    { id: 18, name: "Latte", price: 300.00, image: "ITEM_IMG/DC_201906_7659_MediumIcedMocha_Glass_A1_832x472_nutrition-calculator-tile.jpeg" },
];

let orderItems = [];

document.addEventListener('DOMContentLoaded', function() {
    const menuItemsContainer = document.getElementById('menuItems');
    const orderItemsContainer = document.getElementById('orderItems');
    const totalAmountElement = document.getElementById('totalAmount');
    const placeOrderBtn = document.getElementById('placeOrderBtn');
    const orderPage = document.getElementById('orderPage');
    const searchInput = document.getElementById('searchInput');

    let currentOrderId = localStorage.getItem('currentOrderId');
    if (!currentOrderId) {
        currentOrderId = 1; 
    } else {
        currentOrderId = parseInt(currentOrderId) + 1;
    }
    localStorage.setItem('currentOrderId', currentOrderId); 

    const currentOrder = JSON.parse(localStorage.getItem('currentOrder')) || { 
        orderId: `#${currentOrderId.toString().padStart(4, '0')}`, 
        customerName: 'John Doe'
    };

    document.getElementById('orderId').textContent = currentOrder.orderId;
    document.getElementById('customerName').textContent = currentOrder.customerName;

   
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const filteredItems = menuData.filter(item => 
                item.name.toLowerCase().includes(searchTerm)
            );
            renderMenuItems(filteredItems);
        });
    }


    orderPage.addEventListener('click', function(e) {
        e.preventDefault();
        resetOrder();
        window.location.href = 'Cashier_home_page.html';
    });

    function renderMenuItems(items) {
        menuItemsContainer.innerHTML = items.map(item => `
            <div class="col-md-4 mb-4">
                <div class="menu-item">
                    <img src="${item.image}" alt="${item.name}" class="mb-2" style="width: 100%; height: auto;">
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
        
       
        localStorage.setItem('currentOrderId', currentOrderId);
    });

    window.printBill = function() {
        const total = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const date = new Date().toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

        const billContent = `
            <html>
            <head>
                <title>MOS Burgers Bill</title>
                <style>
                    body {
                        font-family: 'Arial', sans-serif;
                        margin: 0;
                        padding: 20px;
                        background-color: #f9f9f9;
                    }
                    .bill-container {
                        max-width: 400px;
                        margin: 0 auto;
                        background-color: white;
                        padding: 30px;
                        border-radius: 10px;
                        box-shadow: 0 0 20px rgba(0,0,0,0.1);
                    }
                    .bill-header {
                        text-align: center;
                        margin-bottom: 30px;
                    }
                    .company-name {
                        font-size: 24px;
                        font-weight: bold;
                        color: #D35400;
                        margin: 10px 0;
                    }
                    .bill-title {
                        font-size: 18px;
                        color: #333;
                        margin: 10px 0;
                    }
                    .bill-details {
                        margin: 20px 0;
                        padding: 15px 0;
                        border-top: 2px dashed #eee;
                        border-bottom: 2px dashed #eee;
                    }
                    .detail-row {
                        display: flex;
                        justify-content: space-between;
                        margin: 5px 0;
                        color: #555;
                    }
                    .items-table {
                        width: 100%;
                        border-collapse: collapse;
                        margin: 20px 0;
                    }
                    .items-table th {
                        text-align: left;
                        padding: 10px 5px;
                        border-bottom: 2px solid #eee;
                        color: #666;
                    }
                    .items-table td {
                        padding: 10px 5px;
                        border-bottom: 1px solid #eee;
                        color: #444;
                    }
                    .total-section {
                        margin-top: 20px;
                        padding-top: 15px;
                        border-top: 2px dashed #eee;
                    }
                    .total-row {
                        display: flex;
                        justify-content: space-between;
                        font-weight: bold;
                        font-size: 18px;
                        color: #D35400;
                    }
                    .footer {
                        margin-top: 30px;
                        text-align: center;
                        color: #888;
                        font-size: 14px;
                    }
                    .thank-you {
                        margin-top: 20px;
                        text-align: center;
                        font-size: 16px;
                        color: #D35400;
                    }
                    @media print {
                        body {
                            background-color: white;
                        }
                        .bill-container {
                            box-shadow: none;
                        }
                    }
                </style>
            </head>
            <body>
                <div class="bill-container">
                    <div class="bill-header">
                        <div class="company-name">MOS BURGERS</div>
                        <div class="bill-title">SALES INVOICE</div>
                    </div>
                    
                    <div class="bill-details">
                        <div class="detail-row">
                            <span>Order ID:</span>
                            <span>${currentOrder.orderId}</span>
                        </div>
                        <div class="detail-row">
                            <span>Date:</span>
                            <span>${date}</span>
                        </div>
                        <div class="detail-row">
                            <span>Customer:</span>
                            <span>${currentOrder.customerName}</span>
                        </div>
                    </div>

                    <table class="items-table">
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Qty</th>
                                <th>Price</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${orderItems.map(item => `
                                <tr>
                                    <td>${item.name}</td>
                                    <td>${item.quantity}</td>
                                    <td>LKR ${item.price.toFixed(2)}</td>
                                    <td>LKR ${(item.price * item.quantity).toFixed(2)}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>

                    <div class="total-section">
                        <div class="total-row">
                            <span>Total Amount:</span>
                            <span>LKR ${total.toFixed(2)}</span>
                        </div>
                    </div>

                    <div class="thank-you">
                        Thank you for dining with us!
                    </div>
                    
                    <div class="footer">
                        <p>MOS Burgers - Delicious burgers, happy customers!</p>
                        <p>📞 +94 71 69 6996 | 🌐 www.mosburgers.lk</p>
                    </div>
                </div>
            </body>
            </html>
        `;

        const printWindow = window.open('', '', 'height=800,width=600');
        printWindow.document.write(billContent);
        printWindow.document.close();
        printWindow.print();
    };

    window.resetOrder = function() {
        orderItems = [];
        renderOrderItems();
       
        localStorage.removeItem('currentOrder');
    };

    renderMenuItems(menuData);
});