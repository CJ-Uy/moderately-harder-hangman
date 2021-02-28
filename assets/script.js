let api_return = '';

let chosen_word = '';
let definition = '';
let pronounciation = '';

let current_word = new Array(0);
let failed_guesses = new Array(0);
let guess_number = 0;
let num_wrong_guess = 0;

const api_url = 'https://random-words-api.vercel.app/word';

const generate_word = async () => {
  const response = await fetch(api_url);

  return (await response.json())[0];
}

async function main() {
  api_return = await generate_word();
  
  chosen_word = api_return.word;
  chosen_word = chosen_word.toLowerCase();

  definition = api_return.definition;
  pronounciation = api_return.pronounciation;

  document.getElementById("word_definition").innerHTML = definition;

  for (i = 0; i < chosen_word.length; i++){
    current_word.push("_");
  }
  document.getElementById("current_word").innerHTML = current_word.join('');

  console.log("The chosen word for this game is: " + chosen_word);
}

main();

async function check() {
  var guess = (document.getElementById("player_guess").value).toLowerCase();
  var check_result = 0;
  guess_number++;

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

    console.log(guess + " was not found in " + chosen_word);

    failed_guesses.push(guess);

    document.getElementById("wrong_guesses").innerHTML = failed_guesses.join('');
    console.log(current_word.join(''));
    console.log("Player has " + num_wrong_guess + "wrong guesses")
  }
  document.getElementById("player_guess").value = '';
}