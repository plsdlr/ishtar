import EthCrypto from 'eth-crypto';
var store = require('store')


var identity = store.get('user_isthar');

if (identity === undefined){

  console.log("No User found, creating wallet")
  identity = EthCrypto.createIdentity();
  store.set('user_isthar', identity)

}
else {
  console.log("User Found")
}

console.log(identity)

export default function get_adress(){
  return identity.address
}

function sign_test_data(){
  const signHash = EthCrypto.hash.keccak256([
    { // prefix
        type: 'string',
        value: 'Signed for DonationBag:'
    }, { // sender
        type: 'address',
        value: identity.address
    }, { // to
        type: 'address',
        value: '0x81b27afbf34b78670c90f1994935b6267dc9b169'
    }, { // amount
        type: 'uint256',
        value: 21
    }, { // nonce
        type: 'uint256',
        value: 1
    }, { // relayer
        type: 'address',
        value: '0x74e80a2575cfaa491015631d219f7ba76e0fdf83'
    }
  ]);

  const signature = EthCrypto.sign(
    identity.privateKey,
    signHash
  );

return signature
}


console.log(sign_test_data())
