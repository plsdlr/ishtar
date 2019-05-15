//Import the necessary libraries/declare the necessary obje
var express = require('express')
var myParser = require('body-parser')
var cors = require('cors')
var app = express()
const ishtar = require('...')
const verification = require('...')

app.use(cors())

app.use(myParser.urlencoded({ extended : true }))

app.post('/mint', function(request, response) {
    console.log(request.body) //This prints the JSON document received (if it is a JSON document)7
  var pass = verification.assert_mint(request.body['adress'], Number(request.body['amount']))
  if (pass == true){
    ishtar.pray_for_servent(request.body['adress'], request.body['amount'])
    response.sendStatus(200)
  }else {
    response.sendStatus(400)
  }
})

app.post('/transfer', function(request, response) {
    console.log(request.body) //This prints the JSON document received (if it is a JSON document)
  response.sendStatus(200)
})

app.get('/get_balance', function (request, response) {
  console.log(request.body);
  var pass = verification.assert_get_balance(request.body['adress'])
  if (pass == true){
    ishtar.get_balance(request.body['adress']).then(value => {
        console.log(value)
      response.send(value)
    })
  }else {
    response.sendStatus(400)
  }
})
//response.send(balance)

app.listen(8080)
