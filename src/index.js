import _ from 'lodash'
import get_user_stats from './user_tracker.js';
import get_adress from './wallet.js'
import mint_to from './post_http.js';

function component() {

  //document.getElementById('todoInputForm').addEventListener('submit', post_to("0","0"));

  const element = document.createElement('div');
  const btn = document.createElement('button');

  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = _.join(['Hello', ':)'], ' ');
  btn.innerHTML = 'Click me to mint tokens!';
  btn.onclick = async () => {
  const address = await get_adress();
  const tokens = await get_user_stats();
  console.log(tokens)
  const a = await mint_to(address,tokens)
}
  element.appendChild(btn);

  return element;
}



document.body.appendChild(component());
