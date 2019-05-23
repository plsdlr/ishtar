// pragma solidity ^0.5.0;
//
// import "./ERC20.sol";
//
// 
// contract MetaTransactions is ERC20 {
//   using SafeMath for uint256;
//
//   mapping(address => uint256) nonces;
//
//   event MetaTx(address indexed from, uint256 indexed nonce, bool success, bytes returnData);
//
//   // function executeERC20MetaTx(
//   //   address _from,
//   //   address _to,
//   //   uint256 _amount,
//   //   bytes calldata _data,
//   //   uint256 nonce,
//   //   address _relayer,
//   //   bytes calldata _sig
//   //   ) external returns (bool, bytes memory) {
//   //   //uint256 initialGas = gasleft();
//   //   //ensureParametersValidity(nonce, _relayer);
//   //   //ensureCorrectSigner(_from, _to, _amount, _data, params, _relayer, _sig); //ERC20METATRANSACTION_TYPEHASH, signedOnBehalf);
//   //   //return performERC20MetaTx(_from, _to, _amount, _data, params, initialGas, _tokenReceiver);
//   // }
//
//   /* function ensureCorrectSigner(
//     address _from,
//     address _to,
//     uint256 _amount,
//     bytes memory _data,
//     uint256 nonce, // _nonce, _gasPrice, _txGas, _tokenGasPrice
//     address _relayer,
//     bytes memory _sig,
// ) internal view {
//     bytes memory data = abi.encodePacked(
//         "\x19\x01",
//         domainSeparator(),
//         keccak256(abi.encode(
//             typeHash,
//             _from,
//             _to,
//             _amount,
//             keccak256(_data),
//             params[0],
//             params[1],
//             params[2],
//             GAS_LIMIT_OFFSET.add(params[2]), // expect signing gasLimit = txGas + GAS_LIMIT_OFFSET
//             params[3],
//             _relayer
//         ))
//     );
//     if(signedOnBehalf) {
//         require(ERC1271(_from).isValidSignature(data, _sig) == ERC1271_MAGICVALUE, "invalid signature");
//     } else {
//         address signer = SigUtil.recover(keccak256(data), _sig);
//         require(signer == _from, "signer != _from");
//     }
// } */
//
//   /* function ensureParametersValidity(
//       uint256 _nonce, // _nonce, _gasPrice, _txGas, _tokenGasPrice
//       address _relayer
//   ) internal view {
//       require(_relayer == address(0) || _relayer == msg.sender, "wrong relayer");
//       require(nonces[_from]+1 == _nonce, "nonce out of order");
//   } */
//
// }
