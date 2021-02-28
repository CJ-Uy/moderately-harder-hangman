let state = {
  "currentWord" : ""
}

const setState = async (s) => {
    state = {...state, ...s}
}

let current_word;
const api_url = 'https://random-words-api.vercel.app/word';

const generate_word = async () => {
  const response = await fetch(api_url);
  return (await response.json())[0];
}

async function main() {
  current_word = await generate_word();
  await setState({currentWord: current_word})
}

main();

async function check() {
  var word= state["currentWord"].word;
  console.log(word);
}
