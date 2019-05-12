const axios = require('axios');
var querystring = require('querystring');

export default function mint_to(adress,amount){

  axios.post('http://localhost:8080/mint',
    querystring.stringify({
            adress: adress, 
            amount: amount,
            client_id: 'user-client'
    }), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).then(function(response) {
        console.log(response);
    });

}
