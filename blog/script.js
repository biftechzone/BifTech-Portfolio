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
        <p>${p.content.substring(0, 80)}...</p>
        <a href="post.html?id=${p.id}">Oku</a>
      `;
      container.appendChild(card);
    });
  });
