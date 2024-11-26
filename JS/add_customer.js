document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('addCustomerForm');
    const phoneInput = document.getElementById('phone');

    const urlParams = new URLSearchParams(window.location.search);
    const phoneNumber = urlParams.get('phone');
    if (phoneNumber) {
        phoneInput.value = phoneNumber;
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const newCustomer = {
            id: Date.now().toString(), 
            name: document.getElementById('name').value,
            phone: phoneInput.value,
            address: document.getElementById('address').value,
            lastOrder: 'N/A'
        };
        
        
        let customers = JSON.parse(localStorage.getItem('customers')) || [];
        customers.push(newCustomer);
        localStorage.setItem('customers', JSON.stringify(customers));

        console.log('Added new customer:', newCustomer);
        alert('Customer added successfully!');
        window.location.href = 'Cashier_home_page.html';
    });
});