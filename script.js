// Global variables
let userProfile = {};
let cart = [];
let classes = [
    {
        id: 1,
        name: "Hatha Yoga for Beginners",
        type: "hatha",
        level: "beginner",
        duration: "60 min",
        time: "morning",
        price: 1500,
        instructor: "Maya Sherpa",
        description: "Perfect introduction to yoga with basic poses and breathing techniques",
        image: "https://images.pexels.com/photos/3822864/pexels-photo-3822864.jpeg",
        goals: ["flexibility", "stress-relief"]
    },
    {
        id: 2,
        name: "Vinyasa Flow - Intermediate",
        type: "vinyasa",
        level: "intermediate",
        duration: "75 min",
        time: "evening",
        price: 2000,
        instructor: "Karma Lama",
        description: "Dynamic flowing sequences that build strength and flexibility",
        image: "https://images.pexels.com/photos/3823063/pexels-photo-3823063.jpeg",
        goals: ["strength", "flexibility"]
    },
    {
        id: 3,
        name: "Morning Meditation",
        type: "meditation",
        level: "beginner",
        duration: "45 min",
        time: "early-morning",
        price: 1200,
        instructor: "Tenzin Norbu",
        description: "Start your day with mindfulness and inner peace",
        image: "https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg",
        goals: ["spiritual", "stress-relief"]
    },
    {
        id: 4,
        name: "Pranayama & Breathing",
        type: "pranayama",
        level: "intermediate",
        duration: "50 min",
        time: "morning",
        price: 1800,
        instructor: "Dolma Tamang",
        description: "Master ancient breathing techniques for health and vitality",
        image: "https://images.pexels.com/photos/4662438/pexels-photo-4662438.jpeg",
        goals: ["spiritual", "stress-relief"]
    },
    {
        id: 5,
        name: "Power Yoga",
        type: "vinyasa",
        level: "advanced",
        duration: "90 min",
        time: "evening",
        price: 2500,
        instructor: "Bikash Gurung",
        description: "Intense practice for experienced yogis seeking a challenge",
        image: "https://images.pexels.com/photos/4662438/pexels-photo-4662438.jpeg",
        goals: ["strength", "weight-loss"]
    },
    {
        id: 6,
        name: "Restorative Yoga",
        type: "restorative",
        level: "beginner",
        duration: "70 min",
        time: "afternoon",
        price: 1600,
        instructor: "Pema Lhamo",
        description: "Gentle, relaxing poses with props for deep restoration",
        image: "https://images.pexels.com/photos/3822864/pexels-photo-3822864.jpeg",
        goals: ["stress-relief", "flexibility"]
    },
    {
        id: 7,
        name: "Sunrise Hatha",
        type: "hatha",
        level: "intermediate",
        duration: "80 min",
        time: "early-morning",
        price: 1900,
        instructor: "Ang Dorje",
        description: "Traditional Hatha practice as the sun rises over the Himalayas",
        image: "https://images.pexels.com/photos/3823063/pexels-photo-3823063.jpeg",
        goals: ["spiritual", "flexibility"]
    },
    {
        id: 8,
        name: "Weight Loss Yoga",
        type: "vinyasa",
        level: "intermediate",
        duration: "85 min",
        time: "morning",
        price: 2200,
        instructor: "Sita Rai",
        description: "Dynamic sequences designed for weight management and toning",
        image: "https://images.pexels.com/photos/4662438/pexels-photo-4662438.jpeg",
        goals: ["weight-loss", "strength"]
    }
];

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    loadUserProfile();
    displayClasses();
    updateCartCount();
    showSection('home');
    
    // Event listeners
    document.getElementById('profile-form').addEventListener('submit', saveProfile);
    document.getElementById('checkout-form').addEventListener('submit', processPayment);
    
    // Navigation
    setupNavigation();
    
    // Mobile menu
    setupMobileMenu();
});

// Navigation setup
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute('href').substring(1);
            showSection(sectionId);
        });
    });
}

// Mobile menu setup
function setupMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Show section function
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.section, .hero');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        
        // Update content based on section
        if (sectionId === 'recommendations') {
            generateRecommendations();
        } else if (sectionId === 'cart') {
            displayCart();
        }
    }
    
    // Close mobile menu
    document.querySelector('.nav-menu').classList.remove('active');
}

// Save user profile
function saveProfile(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const preferences = [];
    
    // Get checkboxes
    document.querySelectorAll('input[type="checkbox"]:checked').forEach(checkbox => {
        preferences.push(checkbox.value);
    });
    
    userProfile = {
        name: document.getElementById('name').value,
        experience: document.getElementById('experience').value,
        preferredTime: document.getElementById('preferred-time').value,
        preferences: preferences,
        goals: document.getElementById('goals').value
    };
    
    localStorage.setItem('yogaProfile', JSON.stringify(userProfile));
    
    // Show success message
    alert(`Profile saved successfully! Hello ${userProfile.name}, your personalized recommendations are ready.`);
    
    // Automatically show recommendations
    showSection('recommendations');
}

// Load user profile
function loadUserProfile() {
    const saved = localStorage.getItem('yogaProfile');
    if (saved) {
        userProfile = JSON.parse(saved);
        populateProfileForm();
    }
    
    const savedCart = localStorage.getItem('yogaCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
    }
}

// Populate profile form with saved data
function populateProfileForm() {
    if (Object.keys(userProfile).length === 0) return;
    
    document.getElementById('name').value = userProfile.name || '';
    document.getElementById('experience').value = userProfile.experience || '';
    document.getElementById('preferred-time').value = userProfile.preferredTime || '';
    document.getElementById('goals').value = userProfile.goals || '';
    
    // Set checkboxes
    userProfile.preferences?.forEach(pref => {
        const checkbox = document.querySelector(`input[value="${pref}"]`);
        if (checkbox) checkbox.checked = true;
    });
}

// Display all classes
function displayClasses() {
    const grid = document.getElementById('classes-grid');
    grid.innerHTML = '';
    
    classes.forEach(yogaClass => {
        const classCard = createClassCard(yogaClass);
        grid.appendChild(classCard);
    });
}

// Create class card element
function createClassCard(yogaClass) {
    const card = document.createElement('div');
    card.className = 'class-card';
    
    card.innerHTML = `
        <img src="${yogaClass.image}" alt="${yogaClass.name}">
        <div class="class-card-content">
            <h3>${yogaClass.name}</h3>
            <div class="class-meta">
                <span>📅 ${yogaClass.duration}</span>
                <span>👨‍🏫 ${yogaClass.instructor}</span>
                <span>📈 ${capitalizeFirst(yogaClass.level)}</span>
            </div>
            <p>${yogaClass.description}</p>
            <div class="class-tags">
                ${yogaClass.goals.map(goal => `<span class="tag">${capitalizeFirst(goal)}</span>`).join('')}
            </div>
            <div class="class-price">Rs. ${yogaClass.price}</div>
            <button class="btn primary" onclick="addToCart(${yogaClass.id})">
                Add to Cart
            </button>
        </div>
    `;
    
    return card;
}

// Generate recommendations
function generateRecommendations() {
    const container = document.getElementById('recommendations-content');
    
    if (Object.keys(userProfile).length === 0) {
        container.innerHTML = `
            <p>Please complete your profile first to see personalized recommendations.</p>
            <button class="btn primary" onclick="showSection('profile')">Complete Profile</button>
        `;
        return;
    }
    
    const recommendations = getRecommendations();
    
    if (recommendations.length === 0) {
        container.innerHTML = `
            <h3>Hello ${userProfile.name}!</h3>
            <p>We couldn't find perfect matches, but here are some popular classes:</p>
        `;
        // Show popular classes as fallback
        displayRecommendedClasses(classes.slice(0, 3), container);
        return;
    }
    
    container.innerHTML = `
        <h3>Hello ${userProfile.name}! Here are your personalized recommendations:</h3>
    `;
    
    displayRecommendedClasses(recommendations, container);
}

// Recommendation algorithm
function getRecommendations() {
    let scored = classes.map(yogaClass => ({
        ...yogaClass,
        score: calculateScore(yogaClass)
    }));
    
    // Sort by score and return top matches
    return scored
        .filter(item => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 4);
}

// Calculate recommendation score
function calculateScore(yogaClass) {
    let score = 0;
    
    // Experience level match (high priority)
    if (yogaClass.level === userProfile.experience) {
        score += 30;
    } else if (
        (userProfile.experience === 'beginner' && yogaClass.level === 'intermediate') ||
        (userProfile.experience === 'intermediate' && yogaClass.level === 'advanced')
    ) {
        score += 15; // Allow progression
    }
    
    // Time preference match
    if (yogaClass.time === userProfile.preferredTime) {
        score += 25;
    }
    
    // Yoga type preference match
    if (userProfile.preferences?.includes(yogaClass.type)) {
        score += 20;
    }
    
    // Goals match
    const goalMatch = yogaClass.goals.some(goal => goal === userProfile.goals);
    if (goalMatch) {
        score += 25;
    }
    
    return score;
}

// Display recommended classes
function displayRecommendedClasses(recommendations, container) {
    recommendations.forEach(yogaClass => {
        const div = document.createElement('div');
        div.className = 'recommendation-card';
        
        const reasons = getRecommendationReasons(yogaClass);
        
        div.innerHTML = `
            <h3>${yogaClass.name}</h3>
            <p class="recommendation-reason">${reasons}</p>
            <div class="class-meta" style="color: rgba(255,255,255,0.8);">
                <span>📅 ${yogaClass.duration}</span>
                <span>👨‍🏫 ${yogaClass.instructor}</span>
                <span>💰 Rs. ${yogaClass.price}</span>
            </div>
            <p>${yogaClass.description}</p>
            <button class="btn secondary" onclick="addToCart(${yogaClass.id})" style="margin-top: 1rem; background: white; color: var(--primary-color);">
                Add to Cart
            </button>
        `;
        
        container.appendChild(div);
    });
}

// Get recommendation reasons
function getRecommendationReasons(yogaClass) {
    const reasons = [];
    
    if (yogaClass.level === userProfile.experience) {
        reasons.push(`perfect for your ${userProfile.experience} level`);
    }
    
    if (yogaClass.time === userProfile.preferredTime) {
        reasons.push(`matches your ${userProfile.preferredTime.replace('-', ' ')} preference`);
    }
    
    if (userProfile.preferences?.includes(yogaClass.type)) {
        reasons.push(`you selected ${yogaClass.type} as a preference`);
    }
    
    const goalMatch = yogaClass.goals.some(goal => goal === userProfile.goals);
    if (goalMatch) {
        reasons.push(`helps with your goal of ${userProfile.goals.replace('-', ' ')}`);
    }
    
    return reasons.length > 0 
        ? `Recommended because it's ${reasons.join(' and ')}.`
        : 'Popular among students like you.';
}

// Add to cart function
function addToCart(classId) {
    const yogaClass = classes.find(c => c.id === classId);
    if (!yogaClass) return;
    
    // Check if already in cart
    const existingItem = cart.find(item => item.id === classId);
    if (existingItem) {
        alert('This class is already in your cart!');
        return;
    }
    
    cart.push(yogaClass);
    localStorage.setItem('yogaCart', JSON.stringify(cart));
    updateCartCount();
    
    // Show feedback
    alert(`${yogaClass.name} added to cart!`);
}

// Remove from cart
function removeFromCart(classId) {
    cart = cart.filter(item => item.id !== classId);
    localStorage.setItem('yogaCart', JSON.stringify(cart));
    updateCartCount();
    displayCart();
}

// Update cart count
function updateCartCount() {
    document.getElementById('cart-count').textContent = cart.length;
}

// Display cart
function displayCart() {
    const cartContent = document.getElementById('cart-content');
    const checkoutSection = document.getElementById('checkout-section');
    
    if (cart.length === 0) {
        cartContent.innerHTML = '<p>Your cart is empty</p>';
        checkoutSection.style.display = 'none';
        return;
    }
    
    let total = 0;
    let cartHTML = '';
    
    cart.forEach(item => {
        total += item.price;
        cartHTML += `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>${item.instructor} • ${item.duration}</p>
                </div>
                <div>
                    <span class="cart-item-price">Rs. ${item.price}</span>
                    <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
                </div>
            </div>
        `;
    });
    
    cartContent.innerHTML = cartHTML;
    document.getElementById('total-amount').textContent = total;
    checkoutSection.style.display = 'block';
}

// Process payment
function processPayment(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const paymentMethod = document.getElementById('payment-method').value;
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    
    // Simulate payment processing
    setTimeout(() => {
        // Clear cart
        cart = [];
        localStorage.setItem('yogaCart', JSON.stringify(cart));
        updateCartCount();
        
        // Show success modal
        const modal = document.getElementById('success-modal');
        const message = document.getElementById('success-message');
        
        message.innerHTML = `
            <p><strong>Payment successful!</strong></p>
            <p>Total paid: Rs. ${total}</p>
            <p>Payment method: ${capitalizeFirst(paymentMethod)}</p>
            <p>Confirmation sent to: ${email}</p>
            <p>SMS sent to: ${phone}</p>
            <br>
            <p>Classes enrolled:</p>
            <ul style="text-align: left; margin: 1rem 0;">
                ${cart.map(item => `<li>${item.name} - ${item.instructor}</li>`).join('')}
            </ul>
            <p><em>Namaste! See you in class! 🙏</em></p>
        `;
        
        modal.style.display = 'block';
        
        // Reset form
        document.getElementById('checkout-form').reset();
    }, 2000);
    
    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    submitBtn.textContent = 'Processing...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        submitBtn.textContent = 'Complete Payment';
        submitBtn.disabled = false;
    }, 2000);
}

// Close modal
function closeModal() {
    document.getElementById('success-modal').style.display = 'none';
    showSection('classes');
}

// Modal close functionality
document.querySelector('.close').addEventListener('click', closeModal);
window.addEventListener('click', (e) => {
    const modal = document.getElementById('success-modal');
    if (e.target === modal) {
        closeModal();
    }
});

// Utility functions
function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).replace('-', ' ');
}

// Handle responsive navigation
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        document.querySelector('.nav-menu').classList.remove('active');
    }
});

// Add some sample data for development
function addSampleData() {
    if (!localStorage.getItem('yogaProfile')) {
        const sampleProfile = {
            name: "Demo User",
            experience: "beginner",
            preferredTime: "morning",
            preferences: ["hatha", "meditation"],
            goals: "stress-relief"
        };
        localStorage.setItem('yogaProfile', JSON.stringify(sampleProfile));
    }
}

// Call sample data function for demo purposes
// addSampleData();