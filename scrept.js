// ============================================
// ShopZone - Main JavaScript
// ============================================

// --- CART MANAGEMENT ---
let cartCount = 0;

function updateCartDisplay() {
  const badges = document.querySelectorAll('.cart-count');
  badges.forEach(b => b.textContent = cartCount);
}

// Add to Cart buttons
document.addEventListener('DOMContentLoaded', () => {

  // Add to Cart
  document.querySelectorAll('.btn-add').forEach(btn => {
    btn.addEventListener('click', () => {
      cartCount++;
      updateCartDisplay();
      btn.textContent = '✓ Added!';
      btn.style.background = '#067d62';
      setTimeout(() => {
        btn.textContent = 'Add to Cart';
        btn.style.background = '';
      }, 1500);
    });
  });

  // --- PRODUCTS PAGE: FILTER & SORT ---
  const categoryRadios = document.querySelectorAll('input[name="category"]');
  const priceRange = document.getElementById('priceRange');
  const priceDisplay = document.getElementById('priceDisplay');
  const sortSelect = document.getElementById('sortSelect');
  const searchInput = document.getElementById('searchInput');
  const resultCount = document.getElementById('resultCount');
  const productGrid = document.getElementById('productGrid');

  function filterProducts() {
    if (!productGrid) return;

    const selectedCategory = document.querySelector('input[name="category"]:checked')?.value || 'all';
    const maxPrice = priceRange ? parseFloat(priceRange.value) : 9999;
    const sortBy = sortSelect ? sortSelect.value : 'default';
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';

    let cards = Array.from(productGrid.querySelectorAll('.product-card'));

    // Filter
    cards.forEach(card => {
      const category = card.dataset.category;
      const price = parseFloat(card.dataset.price);
      const name = card.querySelector('h4').textContent.toLowerCase();

      const matchCategory = selectedCategory === 'all' || category === selectedCategory;
      const matchPrice = price <= maxPrice;
      const matchSearch = name.includes(searchTerm);

      card.style.display = (matchCategory && matchPrice && matchSearch) ? 'flex' : 'none';
    });

    // Sort visible cards
    let visible = cards.filter(c => c.style.display !== 'none');

    if (sortBy === 'low-high') {
      visible.sort((a, b) => parseFloat(a.dataset.price) - parseFloat(b.dataset.price));
    } else if (sortBy === 'high-low') {
      visible.sort((a, b) => parseFloat(b.dataset.price) - parseFloat(a.dataset.price));
    } else if (sortBy === 'name') {
      visible.sort((a, b) => a.querySelector('h4').textContent.localeCompare(b.querySelector('h4').textContent));
    }

    visible.forEach(card => productGrid.appendChild(card));

    if (resultCount) {
      resultCount.textContent = `Showing ${visible.length} product${visible.length !== 1 ? 's' : ''}`;
    }
  }

  if (categoryRadios.length) {
    categoryRadios.forEach(r => r.addEventListener('change', filterProducts));
  }

  if (priceRange) {
    priceRange.addEventListener('input', () => {
      priceDisplay.textContent = priceRange.value;
      filterProducts();
    });
  }

  if (sortSelect) sortSelect.addEventListener('change', filterProducts);
  if (searchInput) searchInput.addEventListener('input', filterProducts);

});

// --- CONTACT FORM ---
function submitForm() {
  const name = document.getElementById('name')?.value.trim();
  const email = document.getElementById('email')?.value.trim();
  const message = document.getElementById('message')?.value.trim();
  const successMsg = document.getElementById('successMsg');

  if (!name || !email || !message) {
    alert('Please fill in all required fields (Name, Email, Message).');
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  // Show success
  if (successMsg) {
    successMsg.style.display = 'block';
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('message').value = '';
    document.getElementById('subject').selectedIndex = 0;

    setTimeout(() => { successMsg.style.display = 'none'; }, 5000);
  }
}
