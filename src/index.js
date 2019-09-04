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

const wallet_warning = document.getElementById('wallet_warning');
const balance_text = document.getElementById('balance_text');
const productTitle = document.getElementById('product-title');
const warning_text = document.getElementById('warning_texts');

const ishtarForm = document.getElementById('ishtar');
const product = document.getElementById('ishtar-product');
const qr_code_base64 = document.getElementById('ishtar-qrcode');
const qr_signed_data = document.getElementById('ishtar-signed-data');


function _send_transaction_btn(btn_id, btn_text){
  const btn = document.createElement('button');
  const amount_to_pay = config[btn_id];
  btn.setAttribute('id', btn_id);
  btn.setAttribute('data-price', amount_to_pay);
  btn.innerHTML = btn_text + ' (' + amount_to_pay + ')';
  btn.classList.add('button');
  btn.classList.add('ishtar-dark');
  btn.onclick = async () => {
    transfer(btn);
  }
  return btn;
}


async function transfer(button) {
  await _get_balance().then(function () {
    const name = button.id;
    const value = button.innerHTML;
    const product_price = config[name];

    productTitle.innerHTML = value;
    wallet_warning.style.display = 'block';

    if(current_balance >= product_price){
      product.value = value;
      transaction_amount = product_price;

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
      warning_text.innerHTML = 'Insufficiant account balance.<br> You need at least ' + product_price + ' for this item.<br> Your current balance is ' + current_balance;
      warning_text.style.display = 'block';
    }
  });
}


async function processTransfer() {
  const address = await get_address();
  const nounce = await get_nounce();
  const signed_data = await sign_transaction(address_send, transaction_amount);

  await generate_qr(signed_data).then(function(result) {
    qr_code_base64.value = result;
    qr_signed_data.value = signed_data;
    // console.log('generate_qr result: ' + result);
  });

  // console.log('post generate_qr');

  // console.log('processTransfer');
  // console.log(address, address_send, transaction_amount, nounce, signed_data);

  const transfer_result = await transfer_to(address, address_send, transaction_amount, nounce, signed_data);

  // console.log('transfer_result: ' + transfer_result.data);

  return transfer_result;
  // return 'OK';
}


function _mint_tokens() {
  const btn = document.createElement('button');
  const text = document.getElementById('mint_text');
  btn.innerHTML = 'Mint Tokens!';
  btn.classList.add('button');
  btn.classList.add('hollow');
  btn.onclick = async () => {
    const address = await get_address();
    const nounce = await get_nounce();
    const tokens = await get_user_stats();
    if (Number(tokens) > 0) {
      const signed_data = await sign_minting(tokens);
      await mint_to(address, tokens, nounce, signed_data);
      text.innerHTML = 'Your tokens are now being minted. Please allow this process to take several minutes before checking your balance.';
      text.style.display = 'block';
    } else {
      text.style.display = 'block';
      text.innerHTML = 'Insufficiant unminted tokens! Try again later.';
    }
  }

  return btn;
}


function _get_balance_btn() {
  const btn = document.createElement('button');
  btn.setAttribute('id','balance_button')
  btn.innerHTML = 'Check balance';
  btn.classList.add('button');
  btn.classList.add('hollow');
  btn.onclick = function () {
    _get_balance();
  };
  return btn;
}


async function _get_balance() {
  let address = get_address();

  await axios.post('http://nascentstudio.xyz/get_balance',
      querystring.stringify({
        address: address
      }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(function(response) {
        current_balance = balance_text.innerHTML = BigNumber(response.data)
      });
}

$(document).ready(function () {

  $('#token_balance').append(_get_balance_btn());
  $('#token_mint').append(_mint_tokens());
  $('#transfer_tickets').append(_send_transaction_btn('Ticket', 'Buy Ticket Voucher'));
  $('#transfer_space').append(_send_transaction_btn('Space', 'Rent a Room at KW'));
  $('#transfer_dinner').append(_send_transaction_btn('Dinner', 'Get invited to a Dinner'));
  $('#transfer_visit').append(_send_transaction_btn('Visit', 'Get a Tour'));
  $('#transfer_meeting').append(_send_transaction_btn('Meeting', 'Get a Meeting'));
  $('#transfer_cataloge').append(_send_transaction_btn('Cataloges', 'Get Cataloges'));
  $('#transfer_studiospace').append(_send_transaction_btn('Studiospace', 'Rent Studiospace'));
  $('#transfer_guidedtour').append(_send_transaction_btn('GuidedTour', 'Guided Tour'));


  let transferProcessed = false;

  $('#ishtar')
  .hide()
      .on('formvalid.zf.abide', function() {
        if ( transferProcessed === false ) {
          processTransfer().then(function (result) {
            console.log(result.data);
            if (result.data === 'OKZ') {
              console.log('transferProcessed');
              transferProcessed = true;
              // setTimeout(function(){ alert("Hello"); }, 3000);
              $('#ishtar').submit();
            }
          })
        }
      })
      .on('sumbit', e => {

        if (transferProcessed === true) {
          const form = e.target;

          fetch(form.action, {
            method: form.method,
            body: new FormData(form)
          })
        }

        e.preventDefault();
      });

  _get_balance();
});
