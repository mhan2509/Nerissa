// Chuyển trang
function show(id) {
  document.querySelector('.page.active').classList.remove('active');
  document.getElementById(id).classList.add('active');
}

// Khi bấm vào chat thật
function goToChat(mode) {
  // Ẩn màn tiếng sóng
  document.getElementById('voice').classList.remove('active');

  // Load giao diện chat cũ của bạn vào #chat
  fetch('chat.html')  // file chat cũ của bạn đổi tên thành chat.html
    .then(r => r.text())
    .then(html => {
      document.getElementById('chat').innerHTML = html;
      document.getElementById('chat').classList.add('active');

      // Khởi động lại socket + bot như cũ
      const script = document.createElement('script');
      script.src = 'old-script.js'; // file script.js cũ của bạn đổi tên thành old-script.js
      document.body.appendChild(script);

      // Gửi lệnh join
      setTimeout(() => {
        if (mode === 'group') {
          socket.emit('join-group');
        } else {
          socket.emit('join-1to1');
          startBotFallback();
        }
      }, 500);
    });
}
