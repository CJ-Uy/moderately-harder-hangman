function start_game() {
  document.getElementById("rope").style.animation = "rope_down 3s ease-in-out infinite"; 
  document.getElementById("home_hangman").style.animation = "body_up 3s ease-in-out infinite";

  setTimeout(() => {document.getElementById("home_hangman").src = "assets/images/home_hangman.png"; }, 1500);
  setTimeout(() => {redirect(); }, 3000); 
  
}

function redirect() {
  document.location.href = "assets/htdocs/game.html";
}

