//Import the necessary libraries/declare the necessary obje
require('dotenv').config()

var express = require('express')
var myParser = require('body-parser')
var cors = require('cors')
var app = express()
const ishtar_path = process.env.ishtar_path
const verification_path = process.env.verification_path
const ishtar = require(ishtar_path)
const verification = require(verification_path)

app.use(cors())

app.use(myParser.urlencoded({ extended : true }))
app.post('/mint', function(request, response) {
    console.log(request.body)
  var address = request.body['address']
  var amount = Number(request.body['amount'])
  var nonce = request.body['nounce']
  var signature = request.body['signed']
  var pass = verification.assert_mint(address, amount)
  if (pass == true){
    ishtar.pray_for_servent(address, amount, nonce, signature)
    response.sendStatus(200)
  }else {
    response.sendStatus(400)
  }
})

app.post('/transfer', function(request, response) {
  var address_from = request.body['address_from']
  var address_to = request.body['address_to']
  var amount = Number(request.body['amount'])
  var nonce = Number(request.body['nounce'])
  var signature = request.body['signed']
  var pass = verification.assert_transfer(address_from, address_from, nonce, amount)
  if (pass == true){
    ishtar.transfer_blessing(address_from, address_to, nonce, amount, signature)
    response.sendStatus(200)
  }else {
    response.sendStatus(400)
  }
})

app.post('/get_balance', function (request, response) {
  var address = request.body['address']
  var pass = verification.assert_get_balance(address)
  if (pass == true){
    ishtar.get_balance(request.body['address']).then(value => {
      response.send(value.toString())
    })
  }else {
    response.sendStatus(400)
  }
})
//response.send(balance)

app.listen(8080)
