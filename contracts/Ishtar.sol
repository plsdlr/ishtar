pragma solidity 0.5.0;

import "./SignAndSend.sol";
import "./SafeMath.sol";
import "./Blessing.sol";

contract Ishtar is SignAndSend, Blessing {

    using SafeMath for uint256;

    // Blessing public blessing;
    address internal ninatta;
    address internal kulitta;

    constructor(address _blessing) public {
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

    function pray_for_servent(address servant, uint256 amount, uint256 nonce, bytes memory signedMessage) public {
        require(servant != address(0), "isthar: servent cant be void");
        require(!usedNonces[nonce]);
        usedNonces[nonce] = true;
        firetrial(msg.sender);

        /* signature validation */
        // This recreates the message that was signed by the node app
        bytes32 message = keccak256(abi.encodePacked(servant, amount, nonce, this));
        // checks that message is the same as what we think it should be
        require(recoverSigner(message, signedMessage) == servant);

        grantBlessing(servant, amount);
    }

    function spend_blessing(address servant, address recipient, uint256 amount, uint256 nonce, bytes memory signedMessage) public {
        require(servant != address(0), "isthar: servent cant be void");
        require(!usedNonces[nonce]);
        usedNonces[nonce] = true;
        firetrial(msg.sender);

        /* signature validation */
        // This recreates the message that was signed by the node app
        bytes32 message = keccak256(abi.encodePacked(servant, amount, nonce, this));
        // checks that message is the same as what we think it should be
        require(recoverSigner(message, signedMessage) == servant);

        transferBlessing(servant, recipient, amount);
    }

}
