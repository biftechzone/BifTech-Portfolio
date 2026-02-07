fetch("posts.json")
  .then(res => res.json())
  .then(posts => {
    const container = document.getElementById("posts");

    posts.forEach(p => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <h3>${p.title}</h3>
        <span class="tag">${p.tag}</span>
        <p>${p.content.substring(0, 100)}...</p>
        <a href="post.html?id=${encodeURIComponent(p.id)}">Devamını oku →</a>
      `;

      container.appendChild(card);
    });
  })
  .catch(err => {
    document.getElementById("posts").innerHTML =
      "<p>Postlar yüklenemedi.</p>";
  });
