const home = document.getElementById("home");
const playerPage = document.getElementById("playerPage");
const playerVideo = document.getElementById("playerVideo");
const playerTitle = document.getElementById("playerTitle");

function openPlayer(title, src){
  home.style.display = "none";
  playerPage.style.display = "block";
  playerTitle.innerText = title;
  playerVideo.src = src;
  window.scrollTo(0,0);
}

function goHome(){
  playerVideo.pause();
  playerVideo.src = "";
  playerPage.style.display = "none";
  home.style.display = "block";
}

/* TAB SWITCH */
function showTab(type, el){
  document.getElementById("videoTab").style.display =
    type === "video" ? "block" : "none";

  document.getElementById("photoTab").style.display =
    type === "photo" ? "block" : "none";

  document.querySelectorAll(".tab").forEach(t=>t.classList.remove("active"));
  el.classList.add("active");
}
