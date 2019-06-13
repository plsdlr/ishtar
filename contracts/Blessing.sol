pragma solidity ^0.5.0;


import "./ERC20.sol";

contract Blessing is ERC20 {

    string public constant NAME = "ISHTAR";
    string public constant SYMBOL = "ITR";
    uint8 public constant DECIMALS = 18;
    uint256 public constant INITIAL_SUPPLY = 0;

    constructor() public {}

    function grantBlessing(address account, uint256 value) internal {
        _mint(account, value);
    }

    function transferBlessing(address from, address to, uint256 value) internal {
        _transfer(from, to, value);
    }

}
