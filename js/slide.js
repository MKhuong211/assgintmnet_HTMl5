let currentSlide = 0;
function setupSlider() {
  const slider = document.getElementById("slider");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const slides = slider.querySelectorAll(".slide");

  // Hàm chuyển slide
  function showSlide(index) {
    if (index < 0) {
      currentSlide = slides.length - 1;
    } else if (index >= slides.length) {
      currentSlide = 0;
    } else {
      currentSlide = index;
    }
    // Dịch chuyển slider theo chiều ngang
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
  }

  prevBtn.addEventListener("click", () => {
    showSlide(currentSlide - 1);
    resetInterval();
  });
  nextBtn.addEventListener("click", () => {
    showSlide(currentSlide + 1);
    resetInterval();
  });

  // Tự động chuyển slide sau 5s nếu không có tương tác
  let slideInterval = setInterval(() => {
    showSlide(currentSlide + 1);
  }, 5000);

  function resetInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(() => {
      showSlide(currentSlide + 1);
    }, 5000);
  }

  // Lần đầu hiển thị slide hiện tại
  showSlide(currentSlide);
}

document.addEventListener("DOMContentLoaded", setupSlider);
