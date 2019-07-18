import _ from 'lodash'
import BigNumber from 'bignumber.js';
import get_user_stats from './user_tracker.js';
import { get_address, get_nounce, sign_minting, sign_transaction } from './wallet.js'
import { mint_to, get_balance, transfer_to } from './post_http.js';
import { config } from './conf.js';

const axios = require('axios');
var querystring = require('querystring');


async function transfer(button){
  const name = button.id;
  const address_send = config['Address']
  const amount_to_pay = config[name]
  const _account = document.getElementById('balance_text')
  const account_balance = Number(_account.innerHTML)
  if(account_balance >= amount_to_pay){
    const address = await get_address();
    const nounce = await get_nounce();
    const signed_data = await sign_transaction(address_send, amount_to_pay)
    await transfer_to(address, address_send, amount_to_pay, nounce, signed_data)
  }else if (account_balance < amount_to_pay) {
    var text = document.getElementById('warning_texts')
    text.innerHTML = 'insuffiant account balance';
  }
}

function _mint_tokens() {
  const element = document.createElement('div');
  const btn1 = document.createElement('button');
  btn1.innerHTML = 'Mint Tokens!';
  btn1.onclick = async () => {
    const address = await get_address();
    const nounce = await get_nounce();
    const tokens = await get_user_stats();
    if(Number(tokens) > 0){
      const signed_data = await sign_minting(tokens)
      await mint_to(address, tokens, nounce, signed_data)
    }else {
      var text = document.getElementById('warning_texts')
      text.innerHTML = 'insuffiant unminted tokens';
    }
  }
  element.appendChild(btn1);

  return element;
}

function _send_transactions_ticket(){
  const element = document.createElement('div');
  const btn1 = document.createElement('button');
  btn1.setAttribute('id', 'Ticket');
  btn1.innerHTML = 'Buy Ticket Voucher';
  btn1.onclick = async () => {
    transfer(btn1);
  }
  element.appendChild(btn1);
  return element;
}

function _send_transactions_space(){
  const element = document.createElement('div');
  const btn2 = document.createElement('button');
  btn2.setAttribute('id', 'Space');
  btn2.innerHTML = 'Rent a Room at KW';
  btn2.onclick = async () => {
    transfer(btn2);
  }
  element.appendChild(btn2);
  return element;
}

function _send_transactions_dinner(){
  const element = document.createElement('div');
  const btn3 = document.createElement('button');
  btn3.setAttribute('id', 'Dinner');
  btn3.innerHTML = 'Get invited to a Dinner';
  btn3.onclick = async () => {
    transfer(btn3);
  }
  element.appendChild(btn3);
  return element;
}

function _send_transactions_visit(){
  const element = document.createElement('div');
  const btn4 = document.createElement('button');
  btn4.setAttribute('id', 'Visit');
  btn4.innerHTML = 'Get a Tour';
  btn4.onclick = async () => {
    transfer(btn4);
  }
  element.appendChild(btn4);
  return element;
}

function _send_transactions_meeting(){
  const element = document.createElement('div');
  const btn5 = document.createElement('button');
  btn5.setAttribute('id', 'Meeting');
  btn5.innerHTML = 'Get a Meeting';
  btn5.onclick = async () => {
    transfer(btn5);
  }
  element.appendChild(btn5);
  return element;
}


function _get_balance() {
  var address = get_address()
  const element_data = document.createElement('div');
  const text = document.createElement('p');
  text.setAttribute('id','balance_text')
  text.innerHTML = 0;
  const btn = document.createElement('button');
  btn.setAttribute('id','balance_button')
  btn.innerHTML = 'check balance';
  btn.onclick = function() {

    axios.post('http://localhost:8080/get_balance',
      querystring.stringify({
        address: address
      }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(function(response) {
      text.innerHTML = BigNumber(response.data)
    });
  }
  element_data.appendChild(btn);
  element_data.appendChild(text);
  return element_data;
}

document.getElementById('token_balance').appendChild(_get_balance());
document.getElementById('token_mint').appendChild(_mint_tokens());
document.getElementById('transfer_tickets').appendChild(_send_transactions_ticket());
document.getElementById('transfer_space').appendChild(_send_transactions_space());
document.getElementById('transfer_dinner').appendChild(_send_transactions_dinner());
document.getElementById('transfer_visit').appendChild(_send_transactions_visit());
document.getElementById('transfer_meeting').appendChild(_send_transactions_meeting());
