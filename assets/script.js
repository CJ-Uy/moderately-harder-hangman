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

const generate_word = async () => {
  const response = await fetch(api_url);

  return (await response.json())[0];
}

async function main() {
  api_return = await generate_word();
  
  chosen_word = api_return.word;

  if(chosen_word.length > 12) {
    main();
  } else{
    chosen_word = chosen_word.toLowerCase();

    definition = api_return.definition;
    pronounciation = api_return.pronounciation;

    document.getElementById("word_definition").innerHTML = definition;
    document.getElementById("player_score").innerHTML = score;

    for (i = 0; i < chosen_word.length; i++){
      current_word.push("_");
    }
    document.getElementById("current_word").innerHTML = current_word.join('');

    console.log("The chosen word for this game is: " + chosen_word);
  }
}

async function check() {
  var guess = (document.getElementById("player_guess").value).toLowerCase();
  var check_result = 0;
  guess_number++;

  if (/^[a-z]/.test(guess) ) {
  if (failed_guesses.indexOf(guess) < 0) {
    console.log("---------------------------------------------------");
    console.log("Word is: " + chosen_word);
    console.log("Player's guess number " + guess_number + ": " + guess);

    for(i = 0; i < chosen_word.length; i++){
      if(guess == chosen_word[i]){
        check_result++;
        console.log("Player's guess found in " + chosen_word);
        current_word[i] = chosen_word[i]
        console.log(current_word.join(''));
      } 
      document.getElementById("current_word").innerHTML = current_word.join('');
    }

    if(check_result==0){
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
  } else {
    alert("The definition of insanity is doing the same thing over and over and expecting different results (You already tried that)");
    document.getElementById("player_guess").value = '';
  }
  //Checking for a win or lose game state
  if (score == 0){
    alert("YOU HAVE LOST! The word was " + chosen_word);
    window.location.reload();
  }
  if (current_word.indexOf('_') < 0){
    alert("History is written by its victors (Congrats you won) \nYour final score is :" + score);
    window.location.reload();
  }

  } else {
    alert("This is hangman please only input letters");
    document.getElementById("player_guess").value = '';
  }
}

main();