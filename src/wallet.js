import EthCrypto from 'eth-crypto';
var store = require('store')

var identity = store.get('user_isthar');
var nonce = store.get('nonce_isthar');

if (identity === undefined || nonce == undefined){

  console.log("No User found, creating wallet")
  identity = EthCrypto.createIdentity();
  nonce = 0;
  store.set('user_isthar', identity)
  store.set('nonce_isthar', nonce)   /// nonce need to be safed , not working yet

}
else {
  console.log("User Found")
}


document.getElementById("address").innerHTML = identity.address

export function get_adress(){
  return identity.address
}

export function get_nounce(){
  return nonce
}

export function sign_minting(value){
  const message = EthCrypto.hash.keccak256([
    { type: 'address', value: identity.address },
    { type: 'uint256', value: Number(value) },
    { type: 'uint256', value: Number(nonce) },
  ]);
  const signature = EthCrypto.sign(identity.privateKey, message)
  nonce = nonce + 1
  store.set('nonce_isthar', nonce)
  console.log(nonce)
  return signature
}

export function sign_transaction(address, value){
  const message = EthCrypto.hash.keccak256([
    { type: 'address', value: identity.address },
    { type: 'address', value: address },
    { type: 'uint256', value: Number(value) },
    { type: 'uint256', value: Number(nonce) },
  ]);
  const signature = EthCrypto.sign(identity.privateKey, message )
  nonce = nonce + 1
  store.set('nonce_isthar', nonce)
  return signature
}
