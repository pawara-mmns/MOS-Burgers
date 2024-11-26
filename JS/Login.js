document.addEventListener('DOMContentLoaded', function() {
    const switchUserLink = document.getElementById('switchUser');
    const userTypeElement = document.getElementById('userType');
    const loginForm = document.querySelector('form');

    
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

    
    if (switchUserLink) {
        switchUserLink.addEventListener('click', function(e) {
            e.preventDefault();
            switchUserType();
        });
    }

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

   
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
   

    //Authenticate cashier
    function authenticateCashier(username, password) {
       
        if (username === 'kamal' && password === '1234') {
           
            window.location.href = 'Cashier_home_page.html?username=' + encodeURIComponent(username);
        } else {
            alert('Invalid cashier credentials');
            
        }
        
    }

    //Authenticate admin
    function authenticateAdmin(username, password) {
       
        if (username === 'admin' && password === 'admin123') {
            
            window.location.href = 'admin_home_page.html'; 
        } else {
            alert('Invalid admin credentials');
            
        }
    }
});