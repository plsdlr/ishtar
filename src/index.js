import _ from 'lodash'
import BigNumber from 'bignumber.js';
import get_user_stats from './user_tracker.js';
import { get_address, get_nounce, sign_minting, sign_transaction } from './wallet.js'
import { mint_to, get_balance, transfer_to } from './post_http.js';
import { config } from './conf.js';
import generate_qr from './qr_code.js';

const axios = require('axios');
let querystring = require('querystring');

const address_send = config['Address'];
let signed_data;
let transaction_amount;
let transfer_response;

let current_balance = 0;

const balance_text = document.getElementById('balance_text');
const productTitle = document.getElementById('product-title');
const warning_text = document.getElementById('warning_texts');

const ishtarForm = document.getElementById('ishtar');
const product = document.getElementById('ishtar-product');
const qr_code_base64 = document.getElementById('ishtar-qrcode');
const qr_signed_data = document.getElementById('ishtar-signed-data');

ishtarForm.style.display = 'none';
ishtarForm.onsubmit = function (e) {
  e.preventDefault();
  processTransfer();
  // if(tranfser_response === 'OK') {
  //   return true;
  // }

  return false;
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


async function transfer(button){
  await _get_balance();
  const name = button.id;
  const value = button.innerHTML;
  const product_price = config[name];

  productTitle.innerHTML = value;

  if(current_balance >= product_price){
    product.value = value;
    transaction_amount = product_price;
    signed_data = await sign_transaction(address_send, product_price);
    generate_qr(signed_data);

    ishtarForm.style.display = 'block';
    warning_text.style.display = 'none';
    warning_text.innerHTML = '';
  }
  else if (current_balance < product_price) {
    transaction_amount = '';
    signed_data = '';
    product.value = '';
    qr_code_base64.value = '';
    qr_signed_data.value = '';
    ishtarForm.style.display = 'none';
    warning_text.innerHTML = 'Insufficiant account balance. You need at least ' + product_price + ' for this item. Your current balance is ' + current_balance;
    warning_text.style.display = 'block';
  }
}


async function processTransfer() {
  const address = await get_address();
  const nounce = await get_nounce();

  transfer_to(address, address_send, transaction_amount, nounce, signed_data)
      .then(function (result) {
        transfer_response = result.data;
        console.log('transfer_response: ' + transfer_response);
      });
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


function _get_balance_btn() {
  const btn = document.createElement('button');
  btn.setAttribute('id','balance_button')
  btn.innerHTML = 'Check balance';
  btn.onclick = function () {
    _get_balance();
  };
  return btn;
}

function _get_balance() {
  let address = get_address();

  axios.post('http://localhost:8080/get_balance',
      querystring.stringify({
        address: address
      }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(function(response) {
    current_balance = balance_text.innerHTML = BigNumber(response.data)
  });
}


document.getElementById('token_balance').appendChild(_get_balance_btn());
// document.getElementById('balance_text').appendChild(_get_balance());
document.getElementById('token_mint').appendChild(_mint_tokens());
document.getElementById('transfer_tickets').appendChild(_send_transaction_btn('Ticket', 'Buy Ticket Voucher'));
document.getElementById('transfer_space').appendChild(_send_transaction_btn('Space', 'Rent a Room at KW'));
document.getElementById('transfer_dinner').appendChild(_send_transaction_btn('Dinner', 'Get invited to a Dinner'));
document.getElementById('transfer_visit').appendChild(_send_transaction_btn('Visit', 'Get a Tour'));
document.getElementById('transfer_meeting').appendChild(_send_transaction_btn('Meeting', 'Get a Meeting'));
document.getElementById('transfer_cataloge').appendChild(_send_transaction_btn('Cataloges', 'Get Cataloges'));
document.getElementById('transfer_studiospace').appendChild(_send_transaction_btn('Studiospace', 'Rent Studiospace'));
document.getElementById('transfer_guidedtour').appendChild(_send_transaction_btn('GuidedTour', 'Guided Tour'));

_get_balance();