function start_game() {
  document.getElementById("rope").style.animation = "rope_down 3s ease-in-out"; 
  document.getElementById("home_hangman").style.animation = "body_up 3s ease-in-out";

  setTimeout(() => {document.getElementById("home_hangman").src = "assets/images/home_hangman.png"; }, 1500);
  setTimeout(() => {redirect(); }, 3500);
}

function redirect() {
  document.location.href = "assets/htdocs/game.html";
}

