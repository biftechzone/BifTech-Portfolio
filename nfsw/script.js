function openPlayer(videoUrl){
  const modal = document.getElementById("playerModal");
  const video = document.getElementById("playerVideo");

  video.src = videoUrl;
  modal.style.display = "flex";
  document.body.style.overflow = "hidden";
}

function closePlayer(){
  const modal = document.getElementById("playerModal");
  const video = document.getElementById("playerVideo");

  video.pause();
  video.src = "";
  modal.style.display = "none";
  document.body.style.overflow = "auto";
}

function showSection(id, btn){
  document.getElementById("videos").classList.add("hidden");
  document.getElementById("photos").classList.add("hidden");
  document.getElementById(id).classList.remove("hidden");

  document.querySelectorAll(".nav button")
    .forEach(b => b.classList.remove("active"));

  btn.classList.add("active");
}
