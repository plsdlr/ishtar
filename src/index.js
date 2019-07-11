import _ from 'lodash'
import BigNumber from 'bignumber.js';
import get_user_stats from './user_tracker.js';
import { get_adress, get_nounce, sign_minting, sign_transaction } from './wallet.js'
import {mint_to, get_balance, transfer_to } from './post_http.js';

const axios = require('axios');
var querystring = require('querystring');


async function transfer(button){
  var name = button.id;
  var address_send = '0xF19c2D3c7542C5c856B8BdA74E8465E5eA989C95'
  var amount_to_pay = 50;
  // const address = await get_adress();
  // const nounce = await get_nounce();
  // const tokens = await get_user_stats();
  // const signed_data = await sign_transaction(address_send, amount_to_pay)
  // const result = await transfer_to(address, address_send, amount_to_pay, nounce, signed_data)
  console.log(name)
}

function _mint_tokens() {
  const element = document.createElement('div');
  const btn1 = document.createElement('button');
  btn1.innerHTML = 'Mint Tokens!';
  btn1.onclick = async () => {
    const address = await get_adress();
    const nounce = await get_nounce();
    const tokens = await get_user_stats();
    const signed_data = await sign_minting(tokens)
    const result = await mint_to(address, tokens, nounce, signed_data)
  }
  element.appendChild(btn1);

  return element;
}

function _send_transactions_ticket(){
  const element = document.createElement('div');
  const btn1 = document.createElement('button');
  btn1.setAttribute("id", "Ticket");
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
  btn2.setAttribute("id", "Space");
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
  btn3.setAttribute("id", "Dinner");
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
  btn4.setAttribute("id", "Visit");
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
  btn5.setAttribute("id", "Meeting");
  btn5.innerHTML = 'Get a Meeting';
  btn5.onclick = async () => {
    transfer(btn5);
  }
  element.appendChild(btn5);
  return element;
}


function _get_balance() {

  var helper;

  var adress = get_adress()
  //document.getElementById('todoInputForm').addEventListener('submit', post_to("0","0"));

  const element_data = document.createElement('div');
  //element.setAttribute("id","balance")
  const text = document.createElement('p');

  const btn = document.createElement('button');
  btn.innerHTML = 'check balance';
  btn.onclick = function() {

    axios.post('http://localhost:8080/get_balance',
      querystring.stringify({
        adress: adress
      }), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(function(response) {
      console.log(` direct response - ${response.data}`);
      text.innerHTML = BigNumber(response.data)
    });
  }
  element_data.appendChild(btn);
  element_data.appendChild(text);
  return element_data;
}


//document.body.appendChild(component());
document.getElementById("token_balance").appendChild(_get_balance());
document.getElementById("token_mint").appendChild(_mint_tokens());
document.getElementById("transfer_tickets").appendChild(_send_transactions_ticket());
document.getElementById("transfer_space").appendChild(_send_transactions_space());
document.getElementById("transfer_dinner").appendChild(_send_transactions_dinner());
document.getElementById("transfer_visit").appendChild(_send_transactions_visit());
document.getElementById("transfer_meeting").appendChild(_send_transactions_meeting());
