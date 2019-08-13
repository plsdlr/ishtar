const axios = require('axios');
var querystring = require('querystring');

export function mint_to(address, amount, nounce, signed_data){
console.log(address, amount, nounce, signed_data);
  axios.post('http://nascentstudio.xyz/mint',
    querystring.stringify({
            address: address,
            amount: amount,
            nounce: nounce,
            signed: signed_data,
            client_id: 'user-client'
    }), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).then(function(response) {
        //console.log(response);
    });

}

export async function transfer_to(address_from, address_to, amount, nounce, signed_data) {
    console.log(address_from, address_to, amount, nounce, signed_data);

    const response = await axios.post('http://nascentstudio.xyz/transfer',
        querystring.stringify({
            address_from: address_from,
            address_to: address_to,
            amount: amount,
            nounce: nounce,
            signed: signed_data,
            client_id: 'user-client'
        }), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });

    return response;
}

export function get_balance(address){

axios.get('http://nascentstudio.xyz/get_balance',
  querystring.stringify({
          address: address
  }), {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  }).then(function(response) {
      console.log(` direct response - ${response.data}`);
      return response.data
  });
}
