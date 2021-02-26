const api_url = 'https://random-words-api.vercel.app/word';
//link to where I found the API: https://dev.to/mcnaveen/i-made-an-free-api-to-get-random-words-with-pronunciation-127o

async function get_data(){
  const response = await fetch(api_url);
  const data = await response.json();

  //The window prefix is to turn them into global variables
  var word = data[0].word;
  var definition = data[0].definition;
  var pronunciation = data[0].pronunciation;

  console.log("Chosen word: " + word) + "\n";

  var length = word.length;
  console.log("The lenght of the word is: " + length );
  
  document.getElementById("word_definition").innerHTML = definition;

}


get_data();
