window.addEventListener("DOMContentLoaded", () => {
  updateCartIcon();
  renderCartItems();
});

function updateCartIcon() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalQty = cart.reduce(
    (sum, item) => sum + (parseInt(item.quantity) || 0),
    0
  );
  const el = document.getElementById("cartCount");
  if (el) el.textContent = totalQty;
}

function renderCartItems() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const container = document.getElementById("cart-items");
  const totalEl = document.getElementById("total-price");
  container.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const price = parseFloat(item.price) || 0;
    const qty = parseInt(item.quantity) || 0;
    const itemTotal = price * qty;
    total += itemTotal;

    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="cart-item-info">
        <h2>${item.name}</h2>
        <p>Giá: ${price.toLocaleString()}đ VND</p>
        <div class="qty-wrapper">
          <button class="qty-btn" onclick="changeQty(${index}, -1)">–</button>
          <span class="qty-display">${qty}</span>
          <button class="qty-btn" onclick="changeQty(${index}, 1)">+</button>
        </div>
        <p>Thành tiền: ${itemTotal.toLocaleString()} VND</p>
        <button class="remove-btn" onclick="removeItem(${index})">Xóa</button>
      </div>
    `;
    container.appendChild(div);
  });

  totalEl.textContent = `Tổng cộng: ${new Intl.NumberFormat("vi-VN").format(
    total
  )} VND`;
}

function changeQty(index, delta) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const currentQty = parseInt(cart[index].quantity) || 1;
  cart[index].quantity = Math.max(1, currentQty + delta);
  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartIcon();
  renderCartItems();
}

function removeItem(index) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCartItems();
  updateCartIcon();
}

function addToCart(product) {
  // Ép kiểu đảm bảo đúng dữ liệu trước khi thêm vào localStorage
  product.quantity = 1;
  product.price =
    parseFloat(product.price?.toString().replace(/[^\d.-]/g, "")) || 0;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existing = cart.find((item) => item.id === product.id);

  if (existing) {
    existing.quantity = parseInt(existing.quantity || 0) + 1;
  } else {
    cart.push(product);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartIcon();
  alert("Đã thêm vào giỏ hàng!");
}
