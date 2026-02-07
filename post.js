const params = new URLSearchParams(window.location.search);
const id = params.get("id");

fetch("posts.json")
  .then(res => res.json())
  .then(data => {
    const post = data.find(p => String(p.id) === String(id));

    if (!post) {
      document.getElementById("post").innerHTML =
        "<h2>Post bulunamadı</h2>";
      return;
    }

    document.getElementById("post").innerHTML = `
      <h1>${post.title}</h1>
      <span class="tag">${post.tag}</span>
      <p>${post.content}</p>
    `;
  });
