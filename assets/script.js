var api_return = '';

var chosen_word = '';
var definition = '';
var pronounciation = '';

var current_word = new Array(0);
var failed_guesses = new Array(0);
var guess_number = 0;
var num_wrong_guess = 0;

var score = 15;

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

  if(chosen_word.length > 12) {
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
        check_result++;
        console.log("Player's guess found in " + chosen_word);
        current_word[i] = chosen_word[i]
        console.log(current_word.join(''));
      } 
      document.getElementById("current_word").innerHTML = current_word.join('');
    }

    //When user guess is wrong
    if(check_result==0){
      //Change image of Hangman depending on wrong
      hangman_image_source(num_wrong_guess);

      num_wrong_guess++;
      score--;
      document.getElementById("player_score").innerHTML = score;

      console.log(guess + " was not found in " + chosen_word);

      failed_guesses.push(guess);

      document.getElementById("wrong_guesses").innerHTML = failed_guesses.join('');
      console.log(current_word.join(''));
      console.log("Player has " + num_wrong_guess + "wrong guesses")
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
    alert("If at first you don't succeed,: Try, try, try again (You Lost) \nThe word was " + chosen_word);
    window.location.reload();
  }
  //Checking for win game state
  if (current_word.indexOf('_') < 0){
    alert("History is written by its victors (Congrats you won)\nYour final score is :" + score);
    window.location.reload();
  }

  } else {
    alert("Choose your charcter wisely! You did not choose the right character (that wasn't a letter)");
    document.getElementById("player_guess").value = '';
  }
}

function hangman_image_source(x){
  if (x == 0){
    document.getElementById("hangman_state").src = "./assets/hangman_images/hangman_1.png";
  } else if (x == 1){
    document.getElementById("hangman_state").src = "./assets/hangman_images/hangman_2.png";
  } else if (x == 2){
    document.getElementById("hangman_state").src = "./assets/hangman_images/hangman_3.png";
  } else if (x == 3){
    document.getElementById("hangman_state").src = "./assets/hangman_images/hangman_4.png";
  } else if (x == 4){
    document.getElementById("hangman_state").src = "./assets/hangman_images/hangman_5.png";
  } else if (x == 5){
    document.getElementById("hangman_state").src = "./assets/hangman_images/hangman_6.png";
  } else if (x == 6){
    document.getElementById("hangman_state").src = "./assets/hangman_images/hangman_7.png";
  } else if (x == 7){
    document.getElementById("hangman_state").src = "./assets/hangman_images/hangman_8.png";
  } else if (x == 8){
    document.getElementById("hangman_state").src = "./assets/hangman_images/hangman_9.png";
  } else if (x == 9){
    document.getElementById("hangman_state").src = "./assets/hangman_images/hangman_10.png";
  } else if (x == 10){
    document.getElementById("hangman_state").src = "./assets/hangman_images/hangman_11.png";
  } else if (x == 11){
    document.getElementById("hangman_state").src = "./assets/hangman_images/hangman_12.png";
  } else if (x == 12){
    document.getElementById("hangman_state").src = "./assets/hangman_images/hangman_13.png";
  } else if (x == 13){
    document.getElementById("hangman_state").src = "./assets/hangman_images/hangman_14.png";
  } else if (x == 14){
    document.getElementById("hangman_state").src = "./assets/hangman_images/hangman_15.png";
  }
}
main();
