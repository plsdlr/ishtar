import _ from 'lodash'
import BigNumber from 'bignumber.js';
import get_user_stats from './user_tracker.js';
import get_adress from './wallet.js'
import {mint_to, get_balance }from './post_http.js';

const axios = require('axios');
var querystring = require('querystring');
//import get_balance from './post_http.js';

function _mint_tokens() {
  
  const element = document.createElement('div');
  const btn = document.createElement('button');
  btn.innerHTML = 'Mint Tokens!';
  btn.onclick = async () => {
    const address = await get_adress();
    const tokens = await get_user_stats();
    console.log(tokens)
    const a = await mint_to(address,tokens)
  }
  element.appendChild(btn);

  return element;
}



function _get_balance() {

  var helper;

  var adress = get_adress()
  //document.getElementById('todoInputForm').addEventListener('submit', post_to("0","0"));

  const element = document.createElement('div');
  //element.setAttribute("id","balance")
  const text = document.createElement('p');


  axios.post('http://localhost:8080/get_balance',
    querystring.stringify({
      adress: adress
    }), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).then(function(response) {
    console.log(` direct response - ${response.data}`);
    element.innerHTML = BigNumber(response.data)
  });

  return element;
}




//document.body.appendChild(component());
document.getElementById("token_balance").appendChild(_get_balance());
document.getElementById("token_mint").appendChild(_mint_tokens());
