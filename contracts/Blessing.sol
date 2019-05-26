pragma solidity 0.5.0;

import "./ERC20.sol";

contract Blessing is ERC20 {

    constructor() public {}

    // add security to make sure only Ishtar can call
    function grantBlessing(address account, uint256 value) public {
        _mint(account, value);
    }

    // might want to switch to transferFrom??
    // add security to make sure only Ishtar.sol can call 
    function transferBlessing(address from, address to, uint256 value) public {
        _transfer(from, to, value);
    }

}
