// Product database
const products = [
    { 
        id: 1, 
        name: "Signature Hoodie", 
        price: 89.99, 
        category: "Hoodies", 
        image: "https://images.unsplash.com/photo-1527719327859-c6ce80353573?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80",
        description: "Our premium Signature Hoodie features heavyweight fabric, reinforced stitching, and our iconic embroidered crown logo. The perfect blend of comfort and street-ready style."
    },
    { 
        id: 2, 
        name: "Crown Logo Tee", 
        price: 49.99, 
        category: "T-Shirts", 
        image: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
        description: "The Crown Logo Tee features our signature emblem in a minimalist design. Made from premium cotton for all-day comfort and durability."
    },
    { 
        id: 3, 
        name: "Jogger Pants", 
        price: 79.99, 
        category: "Pants", 
        image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1936&q=80",
        description: "Premium jogger pants with tapered fit and elastic cuffs. Features hidden pockets and our signature branding for a sleek, urban look."
    },
    { 
        id: 4, 
        name: "Snapback Hat", 
        price: 39.99, 
        category: "Accessories", 
        image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80",
        description: "Our signature snapback hat features embroidered crown logo and adjustable strap for the perfect fit. The ultimate streetwear accessory."
    }
];

// Cart functionality
let cart = JSON.parse(localStorage.getItem('kingbro_cart')) || [];

// DOM Elements
const accountModal = document.getElementById('accountModal');
const closeAccountModalBtn = document.getElementById('closeAccountModalBtn');
const accountBtn = document.getElementById('accountBtn');
const mobileAccountBtn = document.getElementById('mobileAccountBtn');
const signInTab = document.getElementById('signInTab');
const signUpTab = document.getElementById('signUpTab');
const signInForm = document.getElementById('signInForm');
const signUpForm = document.getElementById('signUpForm');
const signInBtn = document.getElementById('signInBtn');
const signUpBtn = document.getElementById('signUpBtn');
const cartModal = document.getElementById('cartModal');
const cartOverlay = document.getElementById('cartOverlay');
const closeCartBtn = document.getElementById('closeCartBtn');
const cartBtn = document.getElementById('cartBtn');
const mobileCartBtn = document.getElementById('mobileCartBtn');
const cartItemsContainer = document.getElementById('cartItemsContainer');
const cartSubtotal = document.getElementById('cartSubtotal');
const cartCount = document.getElementById('cartCount');
const mobileCartCount = document.getElementById('mobileCartCount');
const searchInput = document.getElementById('searchInput');
const mobileSearchInput = document.getElementById('mobileSearchInput');
const searchResults = document.getElementById('searchResults');
const mobileSearchResults = document.getElementById('mobileSearchResults');
const cartNotification = document.getElementById('cartNotification');

// Initialize the app
function init() {
    initCart();
    setupEventListeners();
}

// Initialize cart
function initCart() {
    updateCartCount();
    renderCartItems();
}

// Update cart count
function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = count;
    mobileCartCount.textContent = count;
}

// Render cart items
function renderCartItems() {
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="py-12 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <h3 class="mt-4 text-lg font-medium text-gray-900">Your cart is empty</h3>
                <p class="mt-1 text-gray-500">Start adding some items to your cart</p>
            </div>
        `;
        cartSubtotal.textContent = '$0.00';
        return;
    }
    
    cartItemsContainer.innerHTML = cart.map(item => {
        const product = products.find(p => p.id === item.id);
        return `
            <div class="py-4 flex" data-id="${item.id}">
                <div class="flex-shrink-0 w-24 h-24 overflow-hidden rounded-md border border-gray-200">
                    <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover">
                </div>
                
                <div class="ml-4 flex-1 flex flex-col">
                    <div class="flex justify-between">
                        <h3 class="text-sm font-medium text-gray-900">${product.name}</h3>
                        <p class="ml-4 text-sm font-medium text-gray-900">$${(product.price * item.quantity).toFixed(2)}</p>
                    </div>
                    <p class="mt-1 text-sm text-gray-500">${product.category}</p>
                    
                    <div class="flex-1 flex items-end justify-between text-sm">
                        <div class="flex items-center border border-gray-300 rounded-md">
                            <button class="quantity-decrease px-2 py-1 text-gray-600 hover:bg-gray-100">-</button>
                            <span class="px-2">${item.quantity}</span>
                            <button class="quantity-increase px-2 py-1 text-gray-600 hover:bg-gray-100">+</button>
                        </div>
                        
                        <button class="remove-item font-medium text-[var(--accent)] hover:text-[var(--primary)]">
                            Remove
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    // Calculate subtotal
    const subtotal = cart.reduce((sum, item) => {
        const product = products.find(p => p.id === item.id);
        return sum + (product.price * item.quantity);
    }, 0);
    cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
    
    // Add event listeners to quantity buttons
    document.querySelectorAll('.quantity-increase').forEach(button => {
        button.addEventListener('click', () => {
            const itemId = parseInt(button.closest('[data-id]').dataset.id);
            increaseQuantity(itemId);
        });
    });
    
    document.querySelectorAll('.quantity-decrease').forEach(button => {
        button.addEventListener('click', () => {
            const itemId = parseInt(button.closest('[data-id]').dataset.id);
            decreaseQuantity(itemId);
        });
    });
    
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', () => {
            const itemId = parseInt(button.closest('[data-id]').dataset.id);
            removeFromCart(itemId);
        });
    });
}

// Cart quantity functions
function increaseQuantity(productId) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += 1;
        saveCart();
        renderCartItems();
        updateCartCount();
    }
}

function decreaseQuantity(productId) {
    const itemIndex = cart.findIndex(item => item.id === productId);
    if (itemIndex !== -1) {
        if (cart[itemIndex].quantity > 1) {
            cart[itemIndex].quantity -= 1;
        } else {
            cart.splice(itemIndex, 1);
        }
        saveCart();
        renderCartItems();
        updateCartCount();
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    renderCartItems();
    updateCartCount();
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('kingbro_cart', JSON.stringify(cart));
}

// Add to cart function
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    
    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        }
        
        saveCart();
        updateCartCount();
        renderCartItems();
        showCartNotification();
    }
}

// Show cart notification
function showCartNotification() {
    cartNotification.classList.remove('hidden');
    cartNotification.classList.add('show');
    
    setTimeout(() => {
        cartNotification.classList.remove('show');
        cartNotification.classList.add('hidden');
    }, 3000);
}

// Account modal functions
function openAccountModal() {
    accountModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeAccountModal() {
    accountModal.classList.remove('active');
    document.body.style.overflow = '';
}

// Tab switching
function switchToSignIn() {
    signInTab.classList.add('active');
    signUpTab.classList.remove('active');
    signInForm.classList.remove('hidden');
    signUpForm.classList.add('hidden');
}

function switchToSignUp() {
    signInTab.classList.remove('active');
    signUpTab.classList.add('active');
    signInForm.classList.add('hidden');
    signUpForm.classList.remove('hidden');
}

// Cart modal functions
function openCart() {
    cartModal.classList.add('open');
    cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCart() {
    cartModal.classList.remove('open');
    cartOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

// Mobile menu toggle
function toggleMobileMenu() {
    mobileMenu.classList.toggle('hidden');
    document.body.style.overflow = mobileMenu.classList.contains('hidden') ? '' : 'hidden';
}

// Search functionality
function renderSearchResults(query, resultsContainer) {
    if (query.trim() === '') {
        resultsContainer.innerHTML = '';
        resultsContainer.classList.remove('active');
        return;
    }
    
    const queryLower = query.toLowerCase();
    const matchedProducts = products.filter(product => 
        product.name.toLowerCase().includes(queryLower) || 
        product.category.toLowerCase().includes(queryLower)
    );
    
    if (matchedProducts.length === 0) {
        resultsContainer.innerHTML = '<div class="search-result-item p-4 text-gray-500">No products found</div>';
    } else {
        resultsContainer.innerHTML = matchedProducts.map(product => `
            <div class="search-result-item" data-id="${product.id}">
                <div class="flex items-center">
                    <img src="${product.image}" alt="${product.name}" class="w-12 h-12 object-cover rounded mr-3">
                    <div>
                        <div class="font-medium">${product.name}</div>
                        <div class="text-sm text-gray-600">$${product.price.toFixed(2)}</div>
                    </div>
                </div>
            </div>
        `).join('');
        
        // Add click handlers to search results
        document.querySelectorAll('.search-result-item').forEach(item => {
            item.addEventListener('click', () => {
                const productId = parseInt(item.dataset.id);
                addToCart(productId);
                
                // Close search results
                resultsContainer.classList.remove('active');
                searchInput.value = '';
                mobileSearchInput.value = '';
            });
        });
    }
    
    resultsContainer.classList.add('active');
}

// Setup event listeners
function setupEventListeners() {
    // Modal triggers
    accountBtn.addEventListener('click', openAccountModal);
    mobileAccountBtn.addEventListener('click', openAccountModal);
    closeAccountModalBtn.addEventListener('click', closeAccountModal);
    
    // Close modal when clicking outside
    accountModal.addEventListener('click', (e) => {
        if (e.target === accountModal) {
            closeAccountModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (accountModal.classList.contains('active')) {
                closeAccountModal();
            }
            if (cartModal.classList.contains('open')) {
                closeCart();
            }
        }
    });
    
    // Tab switching
    signInTab.addEventListener('click', switchToSignIn);
    signUpTab.addEventListener('click', switchToSignUp);
    
    // Form submissions
    signInBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const email = document.getElementById('signInEmail').value;
        const password = document.getElementById('signInPassword').value;
        
        if (!email || !password) {
            alert('Please fill in all fields');
            return;
        }
        
        // In a real implementation, you would authenticate here
        alert(`Signing in with:\nEmail: ${email}\nPassword: ${password}`);
        closeAccountModal();
    });
    
    signUpBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const name = document.getElementById('signUpName').value;
        const email = document.getElementById('signUpEmail').value;
        const password = document.getElementById('signUpPassword').value;
        const confirmPassword = document.getElementById('signUpConfirmPassword').value;
        const acceptTerms = document.getElementById('acceptTerms').checked;
        
        if (!name || !email || !password || !confirmPassword) {
            alert('Please fill in all fields');
            return;
        }
        
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        
        if (!acceptTerms) {
            alert('You must accept the terms and privacy policy');
            return;
        }
        
        // In a real implementation, you would register here
        alert(`Creating account:\nName: ${name}\nEmail: ${email}\nPassword: ${password}`);
        closeAccountModal();
        switchToSignIn(); // Switch back to sign in after registration
    });
    
    // Cart functionality
    cartBtn.addEventListener('click', openCart);
    mobileCartBtn.addEventListener('click', openCart);
    closeCartBtn.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);
    
    // Add to cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.closest('.add-to-cart').dataset.productId);
            addToCart(productId);
            
            // Button feedback
            e.target.textContent = 'ADDED!';
            e.target.classList.add('bg-green-500', 'hover:bg-green-600');
            
            setTimeout(() => {
                e.target.textContent = 'ADD TO CART';
                e.target.classList.remove('bg-green-500', 'hover:bg-green-600');
            }, 1500);
        });
    });
    
    // Search functionality
    searchInput.addEventListener('input', () => {
        renderSearchResults(searchInput.value, searchResults);
    });
    
    mobileSearchInput.addEventListener('input', () => {
        renderSearchResults(mobileSearchInput.value, mobileSearchResults);
    });
    
    // Close search results when clicking outside
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.classList.remove('active');
        }
        if (!mobileSearchInput.contains(e.target) && !mobileSearchResults.contains(e.target)) {
            mobileSearchResults.classList.remove('active');
        }
    });
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);