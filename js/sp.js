// sp.js

document.addEventListener("DOMContentLoaded", function () {
  // --- Product Image Gallery ---
  const mainImage = document.getElementById("main-product-image");
  const thumbnails = document.querySelectorAll(".thumbnail");

  thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener("click", function () {
      mainImage.src = this.src;
      thumbnails.forEach((t) => t.classList.remove("active"));
      this.classList.add("active");
    });
  });

  // --- Scroll to Top Button ---
  const scrollToTopBtn = document.getElementById("scroll-to-top");
  if (scrollToTopBtn) {
    window.addEventListener("scroll", function () {
      scrollToTopBtn.style.display = window.scrollY > 300 ? "flex" : "none";
    });

    scrollToTopBtn.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // --- Load More Thumbnails ---
  const moreBtn = document.querySelector(".thumbnail-more");
  if (moreBtn) {
    moreBtn.addEventListener("click", function () {
      const hiddenThumbs = document.querySelectorAll(".thumbnail.hidden");
      for (let i = 0; i < 3 && i < hiddenThumbs.length; i++) {
        hiddenThumbs[i].classList.remove("hidden");
      }
      if (document.querySelectorAll(".thumbnail.hidden").length === 0) {
        this.style.display = "none";
      }
    });
  }

  // --- View More Specifications ---
  const viewMore = document.querySelector(".view-more-link");
  const viewLess = document.querySelector(".view-less-link");
  const specMore = document.querySelector(".spec-more");

  if (viewMore && viewLess && specMore) {
    viewMore.addEventListener("click", function (e) {
      e.preventDefault();
      specMore.style.display = "block";
      viewMore.style.display = "none";
      viewLess.style.display = "inline";
    });

    viewLess.addEventListener("click", function (e) {
      e.preventDefault();
      specMore.style.display = "none";
      viewMore.style.display = "inline";
      viewLess.style.display = "none";
    });
  }
});

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
    "✅ Đặt hàng thành công!\nTên: " +
      name +
      "\nĐịa chỉ: " +
      address +
      "\nSĐT: " +
      phone
  );
  document.getElementById("orderPopup").style.display = "none";
}
