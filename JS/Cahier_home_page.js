// Cahier_home_page.js

document.addEventListener('DOMContentLoaded', function() {
    // Load customers from localStorage or use default data if not available
    let customers = JSON.parse(localStorage.getItem('customers')) || [
        { id: '1001', name: 'John Perera', phone: '077-456-7890', address: '123 Galle Rd, Colombo', lastOrder: 'Cheeseburger Combo' },
        { id: '1002', name: 'Emma Jayasinghe', phone: '071-567-8901', address: '456 Kandy Rd, Kandy', lastOrder: 'Veggie Burger' },
        { id: '1003', name: 'Michael Fernando', phone: '076-678-9012', address: '789 Matara Rd, Galle', lastOrder: 'Chicken Sandwich' },
        { id: '1004', name: 'Sophia Silva', phone: '078-789-0123', address: '101 Anuradhapura Rd, Anuradhapura', lastOrder: 'Fish Burger Meal' },
        { id: '1005', name: 'William De Silva', phone: '072-890-1234', address: '202 Kurunegala Rd, Kurunegala', lastOrder: 'Double Cheeseburger' },
        { id: '1006', name: 'Olivia Wijesinghe', phone: '070-901-2345', address: '303 Badulla Rd, Badulla', lastOrder: 'Spicy Chicken Wrap' },
        { id: '1007', name: 'James Abeysekera', phone: '075-012-3456', address: '404 Gampaha Rd, Gampaha', lastOrder: 'Mushroom Swiss Burger' },
        { id: '1008', name: 'Ava Rajapaksa', phone: '077-123-4567', address: '505 Negombo Rd, Negombo', lastOrder: 'BBQ Bacon Burger' },
        { id: '1009', name: 'Benjamin Wickramasinghe', phone: '078-234-5678', address: '606 Jaffna Rd, Jaffna', lastOrder: 'Grilled Chicken Salad' },
        { id: '1010', name: 'Mia Gunasekara', phone: '074-345-6789', address: '707 Hambantota Rd, Hambantota', lastOrder: 'Crispy Fish Sandwich' }
    ];

    // Save initial data to localStorage if it doesn't exist
    if (!localStorage.getItem('customers')) {
        localStorage.setItem('customers', JSON.stringify(customers));
    }

    // DOM elements
    const searchCustomerLink = document.getElementById('searchCustomer');
    const orderHistoryLink = document.getElementById('orderHistory');
    const cashierName = document.querySelector('.profile-section span');
    const mainContent = document.querySelector('.main-content');

    // Update cashier name
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username');
    if (username) {
        cashierName.textContent = username;
    }

    // Switch between Search Customer and Order History
    searchCustomerLink.addEventListener('click', function(e) {
        e.preventDefault();
        searchCustomerLink.classList.add('active');
        orderHistoryLink.classList.remove('active');
        mainContent.innerHTML = `
            <h1 class="text-center mb-4">Welcome to MOS Burger</h1>
            <div class="row justify-content-center">
                <div class="col-md-6">
                    <div class="input-group mb-3">
                        <input type="text" class="form-control" placeholder="Search customer by phone number" aria-label="Search customer">
                        <button class="btn btn-burger" type="button">Search</button>
                    </div>
                </div>
            </div>
            <div id="customerDetails" class="customer-details" style="display: none;"></div>
        `;
        // Reattach event listener to new search input
        const searchInput = document.querySelector('.input-group input');
        searchInput.addEventListener('input', handleSearch);
    });

    orderHistoryLink.addEventListener('click', function(e) {
        e.preventDefault();
        orderHistoryLink.classList.add('active');
        searchCustomerLink.classList.remove('active');
        mainContent.innerHTML = '<h2 class="text-center">Order History</h2><p class="text-center">Order history functionality to be implemented.</p>';
    });

    // Search functionality
    function handleSearch() {
        const searchTerm = this.value.trim();
        const customer = customers.find(c => c.phone.includes(searchTerm));
        
        const customerDetails = document.getElementById('customerDetails');
        
        if (searchTerm.length === 0) {
            customerDetails.style.display = 'none';
            return;
        }

        if (customer) {
            customerDetails.innerHTML = `
                <h4>Customer Details</h4>
                <p><strong>Name:</strong> ${customer.name}</p>
                <p><strong>Phone:</strong> ${customer.phone}</p>
                <p><strong>Address:</strong> ${customer.address}</p>
                <p><strong>Last Order:</strong> ${customer.lastOrder}</p>
                <div class="d-flex justify-content-between">
                    <button class="btn btn-burger mt-2" onclick="continueOrder('${customer.id}')">Continue</button>
                    <button class="btn btn-burger mt-2" onclick="viewCustomerDetails('${customer.id}')">View Customer Details</button>
                </div>
            `;
            customerDetails.style.display = 'block';
        } else {
            customerDetails.innerHTML = `
                <p>No customer found with this phone number.</p>
                <button class="btn btn-burger mt-2" onclick="addCustomer('${searchTerm}')">Add Customer</button>
            `;
            customerDetails.style.display = 'block';
        }
    }

    // Attach event listener to search input
    const searchInput = document.querySelector('.input-group input');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }
     // Continue order function
     window.continueOrder = function(customerId) {
        alert(`Continuing order for customer ${customerId}`);
        // Implement order continuation logic here
    };
    // View customer details function
    window.viewCustomerDetails = function(customerId) {
        window.location.href = `customer_details.html?id=${customerId}`;
    };
    // Add customer function
    window.addCustomer = function(phoneNumber) {
        window.location.href = `add_customer.html?phone=${phoneNumber}`;
    };

    // Order ID generation
    let currentOrderId = 1;

    function generateOrderId() {
        return `#${String(currentOrderId).padStart(4, '0')}`;
    }

    window.continueOrder = function(customerId) {
        const customer = customers.find(c => c.id === customerId);
        if (customer) {
            localStorage.setItem('currentOrder', JSON.stringify({
                orderId: generateOrderId(),
                customerName: customer.name
            }));
            window.location.href = 'Cashier_order_pos.html';
        }
    };

    // Reset order ID when a new order is started
    function resetOrder() {
        currentOrderId++;
    }

    // Call this function when navigating back to the cashier home page
    document.getElementById('placeOrderBtn').addEventListener('click', function() {
        resetOrder();
        window.location.href = 'Cashier_home_page.html';
    });
});