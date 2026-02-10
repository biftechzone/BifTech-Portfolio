const API_KEY = "AIzaSyAf1bYFxPOTsiz-yTHd4bCEJMUuVSOGCRE";

async function sendMessage() {
  const input = document.getElementById("userInput");
  const chat = document.getElementById("chat");

  const message = input.value.trim();
  if (!message) return;

  // Kullanıcı mesajı
  chat.innerHTML += `
    <div class="msg user">
      ${message}
    </div>
  `;

  input.value = "";
  chat.scrollTop = chat.scrollHeight;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyAf1bYFxPOTsiz-yTHd4bCEJMUuVSOGCRE`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: message }]
            }
          ]
        })
      }
    );

    const data = await response.json();

    const reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Cevap gelmedi 😶";

    chat.innerHTML += `
      <div class="msg bot">
        ${reply}
      </div>
    `;

    chat.scrollTop = chat.scrollHeight;

  } catch (err) {
    chat.innerHTML += `
      <div class="msg bot">
        Hata oluştu ❌
      </div>
    `;
    console.error(err);
  }
}
