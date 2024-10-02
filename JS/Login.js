document.addEventListener('DOMContentLoaded', function() {
    const switchUserLink = document.getElementById('switchUser');
    const userTypeElement = document.getElementById('userType');
    const loginForm = document.querySelector('form');

    // Function to switch between Cashier and Admin login
    function switchUserType() {
        const currentType = userTypeElement.textContent.trim();
        if (currentType === 'Cashier Login') {
            userTypeElement.textContent = 'Admin Login';
            switchUserLink.textContent = 'Switch to Cashier Login';
            window.history.pushState({}, '', 'adminLogin.html');
        } else {
            userTypeElement.textContent = 'Cashier Login';
            switchUserLink.textContent = 'Switch to Admin Login';
            window.history.pushState({}, '', 'CashierLogin.html');
        }
    }

    // Add click event listener to the switch user link
    if (switchUserLink) {
        switchUserLink.addEventListener('click', function(e) {
            e.preventDefault();
            switchUserType();
        });
    }

    // Function to handle login
    function handleLogin(e) {
        e.preventDefault();
        const username = document.querySelector('input[type="text"]').value;
        const password = document.querySelector('input[type="password"]').value;
        const userType = userTypeElement.textContent.trim();

        if (userType === 'Cashier Login') {
            authenticateCashier(username, password);
        } else {
            authenticateAdmin(username, password);
        }
    }

    // Add submit event listener to the login form
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
   

    // Function to authenticate cashier
    function authenticateCashier(username, password) {
        // This is a mock authentication. In a real application, you would check against a database or API
        if (username === 'kamal' && password === '1234') {
           
            window.location.href = 'Cashier_home_page.html?username=' + encodeURIComponent(username);
        } else {
            
        }
        
    }

    // Function to authenticate admin
    function authenticateAdmin(username, password) {
        // This is a mock authentication. In a real application, you would check against a database or API
        if (username === 'admin' && password === 'admin123') {
            
            window.location.href = 'admin_home_page.html'; // Assuming you have an admin home page
        } else {
            
        }
    }
});