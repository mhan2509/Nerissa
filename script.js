// ============= CHUYỂN TRANG =============
function initHome() {
  document.body.classList.replace('page-home', 'page-home'); // giữ class
}

function goToVoiceMode() {
  document.body.classList.replace('page-home', 'page-voice');
  document.querySelector('.home-container').outerHTML = `
    <div class="voice-container">
      <h1>Tiếng Sóng</h1>
      <p>Muốn nói chuyện ngay?<br>Chọn cách kết nối của bạn</p>
      <div class="voice-options">
        <button class="voice-btn" onclick="enterGroupChat()">
          People Phòng chung<br>
          <span>Tham gia phòng chat với nhiều người đang cần trò chuyện</span>
        </button>
        <button class="voice-btn" onclick="enterOneToOne()">
          Person Kết nối 1:1<br>
          <span>Tìm một người để trò chuyện riêng tư, ẩn danh 100%</span>
        </button>
      </div>
      <div class="hint-box">
        Nếu không tìm được người kết nối sau 5s,<br>bạn sẽ được chuyển sang chat với Biển
      </div>
      <div class="bottom-nav">…giữ nguyên bottom nav…</div>
    </div>`;
}

// Vào Group Chat (dùng lại code cũ)
function enterGroupChat() {
  isGroupMode = true;
  socket.emit('join-group');
  showChat(); // hàm showChat() bạn đã có từ code cũ
}

// Vào 1:1 (dùng lại code cũ)
function enterOneToOne() {
  isGroupMode = false;
  socket.emit('join-1to1');
  showChat();
  startBotFallback(); // hàm cũ của bạn
}

// Hàm showChat() – thêm vào nếu chưa có
function showChat() {
  document.body.innerHTML = oldChatHTML; // giữ nguyên giao diện chat cũ
  location.reload(); // hoặc tái khởi tạo socket + chat
  // Cách đơn giản nhất: reload lại trang để vào chat cũ
  // Nếu bạn muốn không reload → mình sẽ viết tiếp phần giữ state
}
