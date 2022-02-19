// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.10;

import "hardhat/console.sol";

contract Domains {
    mapping(string => address) public domains;

    constructor() {
        console.log("THIS IS MY DOMAIN CONTRACT. NICE.");
    }

    function register(string calldata name) public {
        domains[name] = msg.sender;
        console.log("%s has registered a domain!", msg.sender);
    }

    function getAddress(string calldata name) public view returns (address) {
        return domains[name];
    }
}
