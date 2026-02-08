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
