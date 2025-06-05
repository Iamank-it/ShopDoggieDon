// Navigation menu handling
const list = document.querySelector(".navlist");
const hamburger = document.querySelector(".hamburger");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("fa-x");
    list.classList.toggle("navlist-active");
});

// Close menu when clicking outside
document.addEventListener("click", (e) => {
    if (!hamburger.contains(e.target) && !list.contains(e.target)) {
        hamburger.classList.remove("fa-x");
        list.classList.remove("navlist-active");
    }
});

// Cart functionality
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartCount() {
    const cartCount = document.querySelector(".cart-count");
    if (!cartCount) return;
    
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    if (totalItems > 0) {
        cartCount.textContent = totalItems;
        cartCount.style.display = 'flex';
    } else {
        cartCount.style.display = 'none';
    }
}

function addToCart(name, price, image) {
    let existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, image, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    
    // Update total amount
    let totalAmount = 0;
    cart.forEach(item => {
        totalAmount += item.price * item.quantity;
    });
    localStorage.setItem('totalAmount', totalAmount);

    // Update cart count
    updateCartCount();

    // Show notification
    showNotification(`${name} added to cart!`);
}

function showNotification(message) {
    const notification = document.createElement("div");
    notification.className = "notification";
    notification.textContent = message;
    document.body.appendChild(notification);

    // Trigger animation
    setTimeout(() => notification.classList.add("show"), 100);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove("show");
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Initialize cart count on page load
document.addEventListener("DOMContentLoaded", () => {
    // Update cart from localStorage
    cart = JSON.parse(localStorage.getItem("cart")) || [];
    updateCartCount();
    
    // Add cart count badge to bag icon if it doesn't exist
    const bagIcon = document.querySelector(".fa-shopping-bag");
    if (bagIcon && !document.querySelector(".cart-count")) {
        const cartCount = document.createElement("span");
        cartCount.className = "cart-count";
        bagIcon.parentElement.appendChild(cartCount);
        updateCartCount();
    }
});

// Form validation
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return true;

    const inputs = form.querySelectorAll("input[required], textarea[required]");
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add("error");
        } else {
            input.classList.remove("error");
        }
    });

    return isValid;
}

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            hamburger.classList.remove("fa-x");
            list.classList.remove("navlist-active");
        }
    });
});

// Add loading state to buttons
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function() {
        if (this.classList.contains('loading')) return;
        
        const originalText = this.textContent;
        this.classList.add('loading');
        this.textContent = 'Loading...';
        
        // Reset button after 2 seconds if no other action is taken
        setTimeout(() => {
            if (this.classList.contains('loading')) {
                this.classList.remove('loading');
                this.textContent = originalText;
            }
        }, 2000);
    });
});

// Function to remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    
    // Update total amount
    let totalAmount = 0;
    cart.forEach(item => {
        totalAmount += item.price * item.quantity;
    });
    localStorage.setItem('totalAmount', totalAmount);

    // Update cart count
    updateCartCount();

    // Refresh cart display if on cart page
    if (typeof displayCart === 'function') {
        displayCart();
    }
    if (typeof renderCart === 'function') {
        renderCart();
    }
}

// Function to display cart items
function displayCart() {
    const cartContainer = document.getElementById('cartContainer');
    if (!cartContainer) return;

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalAmount = localStorage.getItem('totalAmount') || 0;

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p class="empty-message">Your cart is empty</p>';
        return;
    }

    let cartHTML = '';
    cart.forEach((item, index) => {
        cartHTML += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="item-details">
                    <h4>${item.name}</h4>
                    <p>Price: ₹${item.price}</p>
                    <p>Quantity: ${item.quantity}</p>
                </div>
                <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
            </div>
        `;
    });

    cartHTML += `
        <div class="total">Total: ₹${totalAmount}</div>
        <button class="payment-btn" onclick="window.location.href='payment.html'">Proceed to Payment</button>
    `;

    cartContainer.innerHTML = cartHTML;
}

// Call displayCart when page loads
document.addEventListener('DOMContentLoaded', function() {
    displayCart();
});