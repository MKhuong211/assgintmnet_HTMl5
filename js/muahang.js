function openOrderPopup() {
  document.getElementById("orderPopup").style.display = "flex";
}

function submitOrder() {
  const name = document.getElementById("customerName").value;
  const address = document.getElementById("customerAddress").value;
  const phone = document.getElementById("customerPhone").value;

  if (!name || !address || !phone) {
    alert("Vui lòng điền đầy đủ thông tin.");
    return;
  }

  alert(
    "✅ Đặt hàng thành công!\\nTên: " +
      name +
      "\\nĐịa chỉ: " +
      address +
      "\\nSĐT: " +
      phone
  );
  document.getElementById("orderPopup").style.display = "none";
}

document.querySelectorAll(".promo-option").forEach((option) => {
  const button = option.querySelector(".promo-select-btn");

  button.addEventListener("click", () => {
    // Nếu đã được chọn, thì bỏ chọn
    if (option.classList.contains("selected")) {
      option.classList.remove("selected");
      button.textContent = "Chọn";
    } else {
      // Bỏ chọn tất cả
      document.querySelectorAll(".promo-option").forEach((opt) => {
        opt.classList.remove("selected");
        opt.querySelector(".promo-select-btn").textContent = "Chọn";
      });

      // Chọn cái hiện tại
      option.classList.add("selected");
      button.textContent = "Bỏ chọn";
    }
  });
});
