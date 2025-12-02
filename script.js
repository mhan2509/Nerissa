// SERVER MỚI – LUÔN SỐNG, KHÔNG NGỦ ĐÔNG
const socket = io('https://nerissa-socket-v2.onrender.com');

const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const chatContainer = document.getElementById('chat-container');
const status = document.getElementById('status');
const modeSwitch = document.getElementById('mode-switch');

const welcomeVoice = document.getElementById('welcome-voice');
const waveBg = document.getElementById('wave-bg');

let isPaired = false;
let isGroupMode = false;
let botTimeout = null;

const replies = [
  "Biển nghe thấy bạn rồi… cứ khóc đi, sóng sẽ lau nước mắt hộ bạn.",
  "Hít một hơi thật sâu cùng mình nào… tốt lắm.",
  "Bạn không cần phải mạnh mẽ đâu. Để biển ôm bạn một lúc nhé.",
  "Dù hôm nay có nặng đến mấy, mai mặt trời vẫn mọc. Biển hứa đấy.",
  "Bạn giỏi lắm vì đã dám mở Nerissa. Biển tự hào về bạn.",
  "Bạn không phải là gánh nặng của bất kỳ ai đâu.",
  "Bạn không làm phiền mình đâu, vinh hạnh của Nerissa là được gặp bạn mà.",
  "Bạn đã đi được một chặng đường dài lắm rồi, nghỉ một chút đi, được không?",
  "Có những ngày chỉ cần tồn tại đã là rất dũng cảm rồi. Bạn làm được rồi đó.",
  "Bạn không hề yếu đuối, bạn chỉ đang mệt thôi. Nghỉ một chút đi nè.",
  "Biển sẽ giữ bí mật này thay bạn, mãi mãi."
];

function addMessage(sender, text) {
  const div = document.createElement('div');
  div.className = sender;
  div.textContent = text;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Phát âm thanh ngay khi mở
document.body.onclick = () => {
  welcomeVoice.play().catch(() => {});
  waveBg.volume = 0.3;
  waveBg.play().catch(() => {});
};

// Socket events
socket.on('connect', () => {
  status.textContent = "Đang tìm một người bạn đồng hành cùng biển...";
  socket.emit('join-1to1');
});

socket.on('paired', () => {
  clearTimeout(botTimeout);
  isPaired = true;
  status.textContent = "Đã tìm thấy một người bạn đồng hành";
  chatContainer.style.display = 'block';
  addMessage('bot', 'Gió đã mang một người lạ đến với bạn… bạn muốn nói gì cũng được nha.');
});

socket.on('message', msg => addMessage('stranger', msg));
socket.on('partner-left', () => {
  isPaired = false;
  addMessage('bot', 'Người đó vừa rời đi… nhưng biển vẫn ở đây với bạn nè.');
  startBotFallback();
});

// Chuyển Group Chat
function toggleMode() {
  isGroupMode = !isGroupMode;
  if (isGroupMode) {
    socket.emit('join-group');
    status.textContent = "Đã vào Group Chat";
    chatContainer.style.display = 'block';
    modeSwitch.textContent = "Chuyển sang 1:1 Chat";
    addMessage('bot', 'Chào cả nhà! Biển đang ở đây cùng mọi người nè');
  } else {
    socket.emit('join-1to1');
    status.textContent = "Đang tìm một người bạn đồng hành cùng biển...";
    modeSwitch.textContent = "Chuyển sang Group Chat";
    isPaired = false;
    startBotFallback();
  }
}

// Fallback bot sau 6s
function startBotFallback() {
  clearTimeout(botTimeout);
  botTimeout = setTimeout(() => {
    if (!isPaired && !isGroupMode) {
      status.textContent = "Biển đang lắng nghe bạn";
      chatContainer.style.display = 'block';
      addMessage('bot', 'Biển đây… bạn muốn nói gì cũng được, mình đang lắng nghe');
    }
  }, 6000);
}
startBotFallback();

// Gửi tin nhắn
function sendMessage() {
  const msg = userInput.value.trim();
  if (!msg) return;
  addMessage('user', msg);
  userInput.value = '';
  if (isPaired || isGroupMode) {
    socket.emit('message', msg);
  } else {
    setTimeout(() => {
      const reply = replies[Math.floor(Math.random() * replies.length)];
      addMessage('bot', reply);
    }, 1200);
  }
}

userInput.addEventListener('keypress', e => { if (e.key === 'Enter') sendMessage(); });
