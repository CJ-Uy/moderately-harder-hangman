var api_return = '';

var chosen_word = '';
var definition = '';
var pronounciation = '';

var current_word = new Array(0);
var failed_guesses = new Array(0);
var guess_number = 0;
var num_wrong_guess = 0;

var score = 15;

var revealed = new Array(0);

const api_url = 'https://random-words-api.vercel.app/word';
//link to where I found the API: https://dev.to/mcnaveen/i-made-an-free-api-to-get-random-words-with-pronunciation-127o 

//word generation from api
const generate_word = async () => {
  const response = await fetch(api_url);

  return (await response.json())[0];
}

//Starting funtion to set the game up
async function main() {
  api_return = await generate_word();
  
  chosen_word = api_return.word;

  if(chosen_word.length > 12 || chosen_word.length <= 4) {
    main();
  } else{
    chosen_word = chosen_word.toLowerCase();

    definition = api_return.definition;
    pronounciation = api_return.pronounciation;

    //Fill in several boxes in the game
    document.getElementById("word_definition").innerHTML = definition;
    document.getElementById("player_score").innerHTML = score;

    //Loop to get the first set of underscores 
    for (i = 0; i < chosen_word.length; i++){
      current_word.push("_");
    }
    document.getElementById("current_word").innerHTML = current_word.join('');

    console.log("The chosen word for this game is: " + chosen_word);
  }
}


//Function to check the user's input procceed accordingly
async function check() {
  var guess = (document.getElementById("player_guess").value).toLowerCase();
  var check_result = 0;
  guess_number++;

  if (/^[a-z]/.test(guess) ) {
  if (failed_guesses.indexOf(guess) < 0) {
    console.log("---------------------------------------------------");
    console.log("Word is: " + chosen_word);
    console.log("Player's guess number " + guess_number + ": " + guess);

    //Loop to check if guess is correct
    for(i = 0; i < chosen_word.length; i++){
      if(guess == chosen_word[i]){
        revealed.push(guess);
        check_result++;

        console.log("Player's guess found in " + chosen_word);
        current_word[i] = chosen_word[i]
        console.log("Game's current word is: " + current_word.join(''));
      } 
      document.getElementById("current_word").innerHTML = current_word.join('');
    }

    //When user guess is wrong
    if(check_result==0){
      num_wrong_guess++;
      score--;
      document.getElementById("player_score").innerHTML = score;

      hangman_image_source();

      console.log(guess + " was not found in " + chosen_word);

      failed_guesses.push(guess);

      document.getElementById("wrong_guesses").innerHTML = failed_guesses.join('');
      console.log("Game's current word is: " + current_word.join(''));
    }
    document.getElementById("player_guess").value = '';
    
  }
  //For case when wrong guess is repeated 
  else {
    alert("The definition of insanity is doing the same thing over and over and expecting different results (You already tried that)");
    document.getElementById("player_guess").value = '';
  }
  //Checking for lose game state
  if (score == 0){
    setTimeout(() => {
      alert("If at first you don't succeed,: Try, try, try again (You Lost) \nThe word was " + chosen_word);
      window.location.reload();
    }, 500);
  }
  //Checking for win game state
  if (current_word.indexOf('_') < 0){
    setTimeout(() => {
      alert("History is written by its victors (Congrats you won)\nYour final score is :" + score); 
      window.location.reload(); 
    }, 500); 
  }

  } else {
    alert("Choose your character wisely! You did not choose the right character (that wasn't a letter)");
    document.getElementById("player_guess").value = '';
  }
}

//Function to change state of hangman image
function hangman_image_source(){

  switch (score) {
    case 14: 
      document.getElementById("hangman_state").src = "../images/hangman_images/hangman_1.png";
      break;
    case 13: 
      document.getElementById("hangman_state").src = "../images/hangman_images/hangman_2.png";
      break;
    case 12: 
      document.getElementById("hangman_state").src = "../images/hangman_images/hangman_3.png";
      break;
    case 11: 
      document.getElementById("hangman_state").src = "../images/hangman_images/hangman_4.png";
      break;
    case 10:
      document.getElementById("hangman_state").src = "../images/hangman_images/hangman_5.png";
      break;
    case 9:
      document.getElementById("hangman_state").src = "../images/hangman_images/hangman_6.png";
      break;
    case 8: 
      document.getElementById("hangman_state").src = "../images/hangman_images/hangman_7.png";
      break;
    case 7: 
      document.getElementById("hangman_state").src = "../images/hangman_images/hangman_8.png";
      break;
    case 6:
      document.getElementById("hangman_state").src = "../images/hangman_images/hangman_9.png";
      break;
    case 5: 
      document.getElementById("hangman_state").src = "../images/hangman_images/hangman_10.png";
      break;
    case 4: 
      document.getElementById("hangman_state").src = "../images/hangman_images/hangman_11.png";
      break;
    case 3:
      document.getElementById("hangman_state").src = "../images/hangman_images/hangman_12.png";
      break;
    case 2:
      document.getElementById("hangman_state").src = "../images/hangman_images/hangman_13.png";
      break;
    case 1:
      document.getElementById("hangman_state").src = "../images/hangman_images/hangman_14.png";
      break;
    case 0:
      document.getElementById("hangman_state").src = "../images/hangman_images/hangman_15.png";
      break;
    default:
      document.getElementById("hangman_state").src = "";  
      break;
  }

}





//Startline for Game Lifelines code


//Function to pick a ranodm letter from the chosen word
function random_letter_from_word() {
  let li = Math.floor(Math.random()*chosen_word.length);

  guess = chosen_word[li];

  if(revealed.indexOf(guess) >= 0){
    random_letter_from_word();
  }
}

//Functions for game lifelines
function reveal() {

  //Picking random letter from the chosen word
  random_letter_from_word();

  //Finding the number of unique letters
  let num_ul = 1;

  for (i = 0; i < chosen_word.length-1; i++){
    is_unique = 1;

    for (j = i+1; j < chosen_word.length+1; j++){  
      if (chosen_word[i] == chosen_word[j]) 
        is_unique = 0;
    }
    if (is_unique == 1)
      num_ul++;
  }

  //Show current score after deduction
  const deduction = Math.ceil(15/num_ul);
  
  //Fail case to not kill yourself in game
  if(score <= deduction){
    alert("Choose your battles wisely (You do not have enough score to use this lifeline)");
    return;
  }
  score -= deduction;
  document.getElementById("player_score").innerHTML = score;

  //Change image of Hangman depending on wrong
  num_wrong_guess += deduction;
  hangman_image_source();

  //Loop to show current word
  for(i = 0; i < chosen_word.length; i++){
    if(guess == chosen_word[i]){
      current_word[i] = chosen_word[i]
      revealed.push(guess);
    } 
    document.getElementById("current_word").innerHTML = current_word.join('');
  }

  //Checking for win game state
  if (current_word.indexOf('_') < 0){
    setTimeout(() => {
      alert("History is written by its victors (Congrats you won)\nYour final score is :" + score); 
      window.location.reload(); 
    }, 500); 
  }
}

function gambler() {
  let your_fate = Math.floor(Math.random()*10);
  
  if(your_fate <= 5){
    score--;
    document.getElementById("player_score").innerHTML = score;

    //Change image of Hangman depending on wrong
    hangman_image_source();

    if(score==0){
      alert("If at first you don't succeed,: Try, try, try again (You Lost) \nThe word was " + chosen_word);
      window.location.reload();
    }

  } else {
    score++;
    hangman_image_source();

    document.getElementById("player_score").innerHTML = score;
  }
}



//Functions for Modal Boxes



//Function to click the confirm button when pressing enter
var input = document.getElementById("player_guess");
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   document.getElementById("confirm_button").click();
  }
});



main();