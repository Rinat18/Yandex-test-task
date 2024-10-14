const items = document.querySelectorAll('.item');
const cart = document.getElementById('cart');
const basket = document.getElementById('basket');
const checkoutBtn = document.getElementById('checkout');
let cartItems = 0;
const maxCartItems = 3;
let activeItem = null;

// Drag and drop для десктопа
items.forEach(item => {
  item.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text', e.target.id);
  });
});

basket.addEventListener('dragover', (e) => {
  e.preventDefault();
  basket.classList.add('drag-over');
});

basket.addEventListener('dragleave', () => {
  basket.classList.remove('drag-over');
});

basket.addEventListener('drop', (e) => {
  e.preventDefault();
  const itemId = e.dataTransfer.getData('text');
  const item = document.getElementById(itemId);
  
  if (!item.classList.contains('in-cart') && cartItems < maxCartItems) {
    cartItems++;
    cart.appendChild(item);
    item.classList.add('in-cart');
    item.style.transform = 'scale(0.8)';
    
    if (cartItems === maxCartItems) {
      checkoutBtn.classList.remove('hidden');
    }
  } else if (cartItems >= maxCartItems) {
    alert('Нельзя добавить больше 3 товаров в корзину!');
  }
  
  basket.classList.remove('drag-over');
});

// Touch события для мобильных устройств
items.forEach(item => {
  item.addEventListener('touchstart', (e) => {
    activeItem = item;
    item.classList.add('dragging');
  });
});

document.addEventListener('touchmove', (e) => {
  if (activeItem) {
    const touch = e.touches[0];
    activeItem.style.position = 'absolute';
    activeItem.style.left = `${touch.clientX - activeItem.offsetWidth / 2}px`;
    activeItem.style.top = `${touch.clientY - activeItem.offsetHeight / 2}px`;
  }
});

document.addEventListener('touchend', (e) => {
  if (activeItem) {
    const touch = e.changedTouches[0];
    const dropZone = document.elementFromPoint(touch.clientX, touch.clientY);
    
    if (dropZone && dropZone.id === 'basket' && cartItems < maxCartItems) {
      cartItems++;
      cart.appendChild(activeItem);
      activeItem.classList.add('in-cart');
      activeItem.style.transform = 'scale(0.8)';
      activeItem.style.position = '';
      activeItem.style.left = '';
      activeItem.style.top = '';
      
      if (cartItems === maxCartItems) {
        checkoutBtn.classList.remove('hidden');
      }
    } else if (cartItems >= maxCartItems) {
      alert('Нельзя добавить больше 3 товаров в корзину!');
    }
    
    activeItem.classList.remove('dragging');
    activeItem = null;
  }
});