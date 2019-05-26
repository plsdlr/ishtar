pragma solidity 0.5.0;

import "./Ownable.sol";

/*
* This contract is based heavily on the example code from Steve Marx's article
* 'Signing and Verifying Messages in Ethereum':
* https://programtheblockchain.com/posts/2018/02/17/signing-and-verifying-messages-in-ethereum/
*/

contract SignAndSend {

    mapping(uint256 => bool) internal usedNonces;

    // Funds are sent at deployment time.
    constructor() public payable {}

    // Signature methods
    function splitSignature(bytes memory sig) internal pure returns (uint8, bytes32, bytes32) {
        require(sig.length == 65);

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

    function recoverSigner(bytes32 message, bytes memory sig) internal pure returns (address) {
        uint8 v;
        bytes32 r;
        bytes32 s;

        (v, r, s) = splitSignature(sig);

        return ecrecover(message, v, r, s);
    }

    // Builds a prefixed hash to mimic the behavior of eth_sign.
    // function prefixed(bytes32 hash) internal pure returns (bytes32) {
    //     return keccak256(abi.encodePacked(hash));
    //     // return keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", hash));
    // }
}
