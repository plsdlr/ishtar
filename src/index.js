import _ from 'lodash'
import BigNumber from 'bignumber.js';
import get_user_stats from './user_tracker.js';
import { get_address, get_nounce, sign_minting, sign_transaction } from './wallet.js'
import { mint_to, get_balance, transfer_to } from './post_http.js';
import { config } from './conf.js';
import generate_qr from './qr_code.js';

const axios = require('axios');
var querystring = require('querystring');

let current_balance = 0;


async function transfer(button){
  const name = button.id;
  const value = button.innerHTML;
  const product = document.getElementById('product');
  const address_send = config['Address'];
  const amount_to_pay = config[name];
  const _account = document.getElementById('balance_text')
  const account_balance = Number(_account.innerHTML);
  const text = document.getElementById('warning_texts');

  product.innerHTML = value;

  if(account_balance >= amount_to_pay){
    const address = await get_address();
    const nounce = await get_nounce();
    const signed_data = await sign_transaction(address_send, amount_to_pay)
    await transfer_to(address, address_send, amount_to_pay, nounce, signed_data)
    const qr = generate_qr(signed_data);
    text.style.display = 'none';
    text.innerHTML = '';
  } else if (account_balance < amount_to_pay) {
    text.innerHTML = 'Insufficiant account balance. You need at least ' + amount_to_pay + ' for this item. Your current balance is ' + current_balance;
    text.style.display = 'block';
    const canvas = document.getElementById('qr_code');
    const context = canvas.getContext('2d');
    context.clearRect(0,0,canvas.width, canvas.height);
  }
}

function _mint_tokens() {
  const btn1 = document.createElement('button');
  btn1.innerHTML = 'Mint Tokens!';
  btn1.onclick = async () => {
    const address = await get_address();
    const nounce = await get_nounce();
    const tokens = await get_user_stats();
    if(Number(tokens) > 0){
      const signed_data = await sign_minting(tokens)
      await mint_to(address, tokens, nounce, signed_data)
    } else {
      var text = document.getElementById('warning_texts')
      text.innerHTML = 'insuffiant unminted tokens';
    }
  }

  return btn1;
}


function _send_transaction_btn(btn_id, btn_text){
  const btn = document.createElement('button');
  const amount_to_pay = config[btn_id];
  btn.setAttribute('id', btn_id);
  btn.setAttribute('data-price', amount_to_pay);
  btn.innerHTML = btn_text + ' (' + amount_to_pay + ')';
  btn.onclick = async () => {
    transfer(btn);
  }
  return btn;
}


function _get_balance() {
  var address = get_address()
  const element_data = document.createElement('span');
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
      current_balance = text.innerHTML = BigNumber(response.data)
    });
  }
  element_data.appendChild(btn);
  element_data.appendChild(text);
  return element_data;
}

document.getElementById('token_balance').appendChild(_get_balance());
document.getElementById('token_mint').appendChild(_mint_tokens());
document.getElementById('transfer_tickets').appendChild(_send_transaction_btn('Ticket', 'Buy Ticket Voucher'));
document.getElementById('transfer_space').appendChild(_send_transaction_btn('Space', 'Rent a Room at KW'));
document.getElementById('transfer_dinner').appendChild(_send_transaction_btn('Dinner', 'Get invited to a Dinner'));
document.getElementById('transfer_visit').appendChild(_send_transaction_btn('Visit', 'Get a Tour'));
document.getElementById('transfer_meeting').appendChild(_send_transaction_btn('Meeting', 'Get a Meeting'));
document.getElementById('transfer_cataloge').appendChild(_send_transaction_btn('Cataloges', 'Get Cataloges'));
document.getElementById('transfer_studiospace').appendChild(_send_transaction_btn('Studiospace', 'Rent Studiospace'));
document.getElementById('transfer_guidedtour').appendChild(_send_transaction_btn('GuidedTour', 'Guided Tour'));
