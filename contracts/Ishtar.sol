pragma solidity 0.5.0;

//import "./SignAndSend.sol";
import "./Verify.sol";
import "./SafeMath.sol";
import "./Blessing.sol";
import { ECDSA } from "./Recover.sol";


contract Ishtar is Blessing, Verify {

    using SafeMath for uint256;

    // Blessing public blessing;
    address internal ninatta;
    address internal kulitta;

    constructor() public {              //deleted unused parameter in contructor
        ninatta = msg.sender;
        // blessing = Blessing(_blessing);
    }

    function set_kulitta(address _kulitta) public {
        require(_kulitta != address(0), "isthar: kulitta cant be void");
        firetrial(_kulitta);
        kulitta = _kulitta;
    }

    function firetrial(address priest) public {
        require(priest == ninatta || priest == kulitta, "isthar: failed the firetrial");
    }


    /* function pray_for_servent(address servant, uint256 amount, uint256 nonce, bytes memory signedMessage) public {
        require(servant != address(0), "isthar: servent cant be void");
        //require(!usedNonces[nonce], "nonce used");
        //usedNonces[nonce] = true;
        firetrial(msg.sender);

        bytes32 message = keccak256(abi.encodePacked(servant, amount, nonce, this));
        require(ECDSA.recover(message, signedMessage) == servant,"hash dont match");

        grantBlessing(servant, amount);
    } */

    function checkhash_test(address servant, uint256 amount, uint256 nonce,address contract_adress) public returns (bytes32){
      bytes32 message = keccak256(abi.encodePacked(servant, amount, nonce, contract_adress));
      return message;
      //require( message == _hash, "hashes dont mach");
    }

    function rec_test(address servant, uint256 amount, uint256 nonce,address contract_adress,bytes memory signedMessage) public returns (address){
      //bytes32 message = ECDSA.toEthSignedMessageHash(keccak256(abi.encodePacked(servant, amount, nonce, contract_adress)));
      bytes32 message = keccak256(abi.encodePacked(servant, amount, nonce, contract_adress));
      address rec = recoverSigner(message, signedMessage);
      return rec;
    }

    function checkrec_test(  uint256 nonce, string memory test, bytes memory signedMessage) public returns (address){
      //bytes32 message = ECDSA.toEthSignedMessageHash(keccak256(abi.encodePacked(servant, amount, nonce, contract_adress)));
      bytes32 message = keccak256(abi.encodePacked(nonce, test));
      address rec = recoverSigner(message, signedMessage);
      return rec;
    }


    /* function rec_test(address servant, uint256 amount, uint256 nonce,address contract_adress,bytes memory signedMessage) public returns (address){
      //bytes32 message = ECDSA.toEthSignedMessageHash(keccak256(abi.encodePacked(servant, amount, nonce, contract_adress)));
      bytes32 message = ECDSA.toEthSignedMessageHash(keccak256(abi.encodePacked(servant, amount, nonce, contract_adress)));
      address rec = ECDSA.recover(message, signedMessage);
      return rec;
    } */

    /* function spend_blessing(address servant, address recipient, uint256 amount, uint256 nonce, bytes memory signedMessage) public {
        require(servant != address(0), "isthar: servent cant be void");
        //require(!usedNonces[nonce], "nonce used");
        //usedNonces[nonce] = true;
        firetrial(msg.sender);
        // This recreates the message that was signed by the node app
        bytes32 message = keccak256(abi.encodePacked(servant, amount, nonce, this));
        // checks that message is the same as what we think it should be
        require(recoverSigner(message, signedMessage) == servant, "hash dont match");

        transferBlessing(servant, recipient, amount);
    } */

}
