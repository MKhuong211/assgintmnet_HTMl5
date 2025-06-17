const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", function (e) {
  e.preventDefault(); // Ngăn submit form nếu có
  const keyword = searchInput.value.trim();

  if (keyword === "") {
    alert("Vui lòng nhập từ khóa tìm kiếm!");
  } else {
    alert(`Bạn đang tìm kiếm: "${keyword}"`);
  }
});
