function gotoHome() {
  document.getElementById('login').classList.remove('active');
  document.getElementById('home').classList.add('active');
}

function gotoVoice() {
  document.getElementById('home').classList.remove('active');
  document.getElementById('voice').classList.add('active');
}

function startGroup() {
  // Sau này chuyển sang chat cũ + join-group
  alert("Sắp vào Phòng chung...");
  // window.location.href = "chat.html"; hoặc innerHTML chat cũ
}

function startOneToOne() {
  // Sau này chuyển sang chat cũ + join-1to1 + fallback bot
  alert("Sắp vào Kết nối 1:1...");
}
