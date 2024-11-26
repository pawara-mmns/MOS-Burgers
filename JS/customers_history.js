document.addEventListener('DOMContentLoaded', function() {
    let customers = JSON.parse(localStorage.getItem('customers')) || [];

    const customerList = document.getElementById('customerList');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');

    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username');
    if (username) {
        document.getElementById('cashierName').textContent = username;
    }

    function displayCustomers(customersToShow) {
        customerList.innerHTML = '';
        customersToShow.forEach(customer => {
            const customerCard = document.createElement('div');
            customerCard.className = 'col-md-4';
            customerCard.innerHTML = `
                <div class="customer-card">
                    <h5>${customer.name}</h5>
                    <p><strong>Phone:</strong> ${customer.phone}</p>
                    <p><strong>Address:</strong> ${customer.address}</p>
                    <p><strong>Last Order:</strong> ${customer.lastOrder || 'N/A'}</p>
                    <button class="btn btn-burger mt-2" onclick="viewCustomerDetails('${customer.id}')">View Details</button>
                </div>
            `;
            customerList.appendChild(customerCard);
        });
    }

    displayCustomers(customers);

    function searchCustomers() {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredCustomers = customers.filter(customer => 
            customer.name.toLowerCase().includes(searchTerm) ||
            customer.phone.includes(searchTerm) ||
            customer.address.toLowerCase().includes(searchTerm)
        );
        displayCustomers(filteredCustomers);
    }

    searchButton.addEventListener('click', searchCustomers);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchCustomers();
        }
    });

    window.viewCustomerDetails = function(customerId) {
        window.location.href = `customer_details.html?id=${customerId}`;
    };
});