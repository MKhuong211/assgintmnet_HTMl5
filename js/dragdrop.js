const products = document.querySelectorAll('.product-box');
  const cartDrop = document.getElementById('cartDrop');
  const cartList = document.getElementById('cartList');
  const cartTotal = document.getElementById('cartTotal');
  const successPopup = document.getElementById('successPopup');
  const closePopup = document.getElementById('closePopup');

  let cart = JSON.parse(localStorage.getItem('cartItems')) || [];
  let popupShownAt2Items = false;

  function updateCartUI() {
    cartList.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <span>${item.name} - ${item.price.toLocaleString()}đ</span>
        <button class="remove-btn" data-index="${index}">Xoá</button>
      `;
      cartList.appendChild(li);
      total += item.price;
    });

    cartTotal.textContent = `Tổng tiền: ${total.toLocaleString()}đ`;
    localStorage.setItem('cartItems', JSON.stringify(cart));
    document.getElementById('cartCount').textContent = cart.length;

    const removeButtons = document.querySelectorAll('.remove-btn');
    removeButtons.forEach(button => {
      button.addEventListener('click', () => {
        const index = parseInt(button.getAttribute('data-index'));
        cart.splice(index, 1);
        updateCartUI();
      });
    });
  }

  closePopup.addEventListener('click', () => {
    successPopup.classList.add('hidden');
  });

  products.forEach(product => {
    product.setAttribute('draggable', 'true');
    product.addEventListener('dragstart', e => {
      const name = product.querySelector('.product-name').innerText;
      const priceText = product.querySelector('.price-new').innerText.replace(/\D/g, '');
      const price = parseInt(priceText);
      const item = { name, price };
      e.dataTransfer.setData('text/plain', JSON.stringify(item));
    });
  });

  cartDrop.addEventListener('dragover', e => {
    e.preventDefault();
    cartDrop.classList.add('drag-over');
  });

  cartDrop.addEventListener('dragleave', () => {
    cartDrop.classList.remove('drag-over');
  });

  cartDrop.addEventListener('drop', e => {
    e.preventDefault();
    cartDrop.classList.remove('drag-over');
    const item = JSON.parse(e.dataTransfer.getData('text/plain'));
    cart.push(item);
    updateCartUI();

    if (cart.length === 2 && !popupShownAt2Items) {
      successPopup.classList.remove('hidden');
      popupShownAt2Items = true;
    }
  });

  updateCartUI();