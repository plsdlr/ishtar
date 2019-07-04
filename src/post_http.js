const axios = require('axios');
var querystring = require('querystring');

export function mint_to(adress, amount, nounce, signed_data){
console.log(adress, amount, nounce, signed_data);
  axios.post('http://localhost:8080/mint',
    querystring.stringify({
            adress: adress,
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

export function get_balance(adress){

axios.get('http://localhost:8080/get_balance',
  querystring.stringify({
          adress: adress
  }), {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  }).then(function(response) {
      console.log(` direct response - ${response.data}`);
      return response.data
  });
}
