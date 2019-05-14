pragma solidity ^0.5.0;

import "./MetaTransactions.sol";

contract Ishtar is MetaTransactions {
    using SafeMath for uint256;

    address public ninatta;
    address public kulitta;

    constructor() public {
        ninatta = msg.sender;
    }

    function set_kulitta(address _kulitta)public{
      require(_kulitta != address(0), "isthar: kulitta cant be void");
      firetrial(_kulitta);
      kulitta = _kulitta;
    }

    function firetrial(address priest)public{
      require(priest == ninatta || priest == kulitta, "isthar: failed the firetrial");
    }

    function pray_for_servent(address servent, uint256 amount)public{
      require(servent != address(0), "isthar: servent cant be void");
      firetrial(msg.sender);
      _mint(servent, amount);
    }
  }
