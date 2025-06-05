// Function to update cart count in the navbar
function updateCartCount() {
    try {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        const cartCountElements = document.querySelectorAll('.cart-count');
        
        // If no elements found, wait a bit and try again (for dynamic content)
        if (cartCountElements.length === 0) {
            setTimeout(updateCartCount, 100);
            return;
        }

        cartCountElements.forEach(element => {
            element.textContent = totalItems;
            // Make sure the count is visible
            element.style.display = totalItems > 0 ? 'block' : 'none';
        });
    } catch (error) {
        console.error('Error updating cart count:', error);
    }
}

// Function to add item to cart
function addToCart(name, price, image) {
    try {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        let existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ name, price, image, quantity: 1 });
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
        alert(name + " added to cart!");
    } catch (error) {
        console.error('Error adding to cart:', error);
    }
}

// Update cart count when page loads
document.addEventListener('DOMContentLoaded', updateCartCount);

// Update cart count when storage changes (for cross-page updates)
window.addEventListener('storage', function(e) {
    if (e.key === 'cart') {
        updateCartCount();
    }
});

// Update cart count periodically to ensure it stays in sync
setInterval(updateCartCount, 1000);

// Initial update
updateCartCount(); 