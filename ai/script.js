const container = document.querySelector(".container");
const chatsContainer = document.querySelector(".chats-container");
const promptForm = document.querySelector(".prompt-form");
const promptInput = promptForm.querySelector(".prompt-input");
const fileInput = promptForm.querySelector("#file-input");
const fileUploadWrapper = promptForm.querySelector(".file-upload-wrapper");
const themeToggleBtn = document.querySelector("#theme-toggle-btn");

// ================= API SETUP =================

// 🔴 SADECE BURAYI DOLDUR
const API_KEY = "AIzaSyAf1bYFxPOTsiz-yTHd4bCEJMUuVSOGCRE";

// 🔴 GOOGLE’IN CURL’DE VERDİĞİ ÇALIŞAN ENDPOINT
const API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyAf1bYFxPOTsiz-yTHd4bCEJMUuVSOGCRE";

// =================================================

let controller, typingInterval;
const chatHistory = [];
const userData = { message: "", file: {} };

// Theme
const isLightTheme = localStorage.getItem("themeColor") === "light_mode";
document.body.classList.toggle("light-theme", isLightTheme);
themeToggleBtn.textContent = isLightTheme ? "dark_mode" : "light_mode";

// Create message element
const createMessageElement = (content, ...classes) => {
  const div = document.createElement("div");
  div.classList.add("message", ...classes);
  div.innerHTML = content;
  return div;
};

// Scroll
const scrollToBottom = () =>
  container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });

// Typing effect
const typingEffect = (text, textElement, botMsgDiv) => {
  textElement.textContent = "";
  const words = text.split(" ");
  let i = 0;

  typingInterval = setInterval(() => {
    if (i < words.length) {
      textElement.textContent += (i === 0 ? "" : " ") + words[i++];
      scrollToBottom();
    } else {
      clearInterval(typingInterval);
      botMsgDiv.classList.remove("loading");
      document.body.classList.remove("bot-responding");
    }
  }, 40);
};

// ================= GEMINI REQUEST =================
const generateResponse = async (botMsgDiv) => {
  const textElement = botMsgDiv.querySelector(".message-text");
  controller = new AbortController();

  chatHistory.push({
    role: "user",
    parts: [{ text: userData.message }],
  });

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-goog-api-key": API_KEY, // 🔥 KRİTİK SATIR
      },
      body: JSON.stringify({
        contents: chatHistory,
      }),
      signal: controller.signal,
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error.message);

    const reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Cevap gelmedi 😶";

    typingEffect(reply, textElement, botMsgDiv);
    chatHistory.push({ role: "model", parts: [{ text: reply }] });

  } catch (err) {
    textElement.textContent = err.message;
    textElement.style.color = "#d62939";
    botMsgDiv.classList.remove("loading");
    document.body.classList.remove("bot-responding");
  }
};

// Submit
const handleFormSubmit = (e) => {
  e.preventDefault();
  const msg = promptInput.value.trim();
  if (!msg || document.body.classList.contains("bot-responding")) return;

  userData.message = msg;
  promptInput.value = "";

  document.body.classList.add("chats-active", "bot-responding");
  fileUploadWrapper.classList.remove("active", "img-attached", "file-attached");

  const userMsgDiv = createMessageElement(
    `<p class="message-text">${msg}</p>`,
    "user-message"
  );
  chatsContainer.appendChild(userMsgDiv);
  scrollToBottom();

  setTimeout(() => {
    const botMsgDiv = createMessageElement(
      `<img src="gemini.svg" class="avatar"><p class="message-text">Thinking...</p>`,
      "bot-message",
      "loading"
    );
    chatsContainer.appendChild(botMsgDiv);
    scrollToBottom();
    generateResponse(botMsgDiv);
  }, 500);
};

// Events
promptForm.addEventListener("submit", handleFormSubmit);

themeToggleBtn.addEventListener("click", () => {
  const light = document.body.classList.toggle("light-theme");
  localStorage.setItem("themeColor", light ? "light_mode" : "dark_mode");
  themeToggleBtn.textContent = light ? "dark_mode" : "light_mode";
});

document.querySelector("#delete-chats-btn").addEventListener("click", () => {
  chatHistory.length = 0;
  chatsContainer.innerHTML = "";
  document.body.classList.remove("chats-active", "bot-responding");
});

document.querySelector("#stop-response-btn").addEventListener("click", () => {
  controller?.abort();
  clearInterval(typingInterval);
  document.body.classList.remove("bot-responding");
});
