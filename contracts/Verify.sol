pragma solidity ^0.5.0;

contract Verify {

  function isValidPrayer(address a, uint256 b, uint256 c, bytes memory sig, address _sender) public view returns(bool){
    bytes32 message = keccak256(abi.encodePacked(a, b, c));
    return (recoverSigner(message, sig) == _sender);
  }

  function isValidSpend(address a, address b, uint256 c, uint256 d, bytes memory sig, address _sender) public view returns(bool){
    bytes32 message = keccak256(abi.encodePacked(a, b, c, d));
    return (recoverSigner(message, sig) == _sender);
  }

  function recoverSigner(bytes32 message, bytes memory sig)
       public
       pure
       returns (address)
    {
       uint8 v;
       bytes32 r;
       bytes32 s;

       (v, r, s) = splitSignature(sig);
       return ecrecover(message, v, r, s);
  }

  function splitSignature(bytes memory sig)
       public
       pure
       returns (uint8, bytes32, bytes32)
   {
       require(sig.length == 65,"sign to long");

       bytes32 r;
       bytes32 s;
       uint8 v;

       assembly {
           // first 32 bytes, after the length prefix
           r := mload(add(sig, 32))
           // second 32 bytes
           s := mload(add(sig, 64))
           // final byte (first byte of the next 32 bytes)
           v := byte(0, mload(add(sig, 96)))
       }

       return (v, r, s);
   }
}
