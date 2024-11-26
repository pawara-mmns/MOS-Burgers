document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('customerForm');
    const deleteButton = document.getElementById('deleteCustomer');
    const urlParams = new URLSearchParams(window.location.search);
    const customerId = urlParams.get('id');

    let customers = JSON.parse(localStorage.getItem('customers')) || [];
    let customer = customers.find(c => c.id === customerId);

    if (!customer) {
        alert('Customer not found');
        window.location.href = 'Cashier_home_page.html';
        return;
    }

    document.getElementById('name').value = customer.name;
    document.getElementById('phone').value = customer.phone;
    document.getElementById('address').value = customer.address;
    document.getElementById('lastOrder').value = customer.lastOrder;

    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        customer.name = document.getElementById('name').value;
        customer.phone = document.getElementById('phone').value;
        customer.address = document.getElementById('address').value;
        customer.lastOrder = document.getElementById('lastOrder').value;

        localStorage.setItem('customers', JSON.stringify(customers));
        console.log('Updated customer:', customer);
        alert('Customer updated successfully!');
    });

    deleteButton.addEventListener('click', function() {
        if (confirm('Are you sure you want to delete this customer?')) {
            customers = customers.filter(c => c.id !== customerId);
            localStorage.setItem('customers', JSON.stringify(customers));
            console.log('Deleted customer:', customerId);
            alert('Customer deleted successfully!');
            window.location.href = 'Cashier_home_page.html';
        }
    });
});