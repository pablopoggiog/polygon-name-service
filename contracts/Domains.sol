// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.10;

import "hardhat/console.sol";

/*
 * @title Domains
 * Domains - Contract that creates and stores domains in the blockchain.
 */
contract Domains {
    /*
     * @notice - stores addresses of the owners of all the domains, indexed by domain's name.
     */
    mapping(string => address) public domains;
    /*
     * @notice - stores records for domains, indexed by domain's name.
     */
    mapping(string => string) public records;

    /*
     * @dev - for now, it only logs a string to the console.
     */
    constructor() {
        console.log("Yo yo, I'm a contract and I'm smart");
    }

    /*
     * @notice - registers a domain name, mapping it to the caller's address.
     * @param name - the name for the domain to be registered.
     */
    function register(string calldata name) public {
        require(domains[name] == address(0), "Name is already in use");

        domains[name] = msg.sender;
        console.log("%s has registered a domain!", msg.sender);
    }

    /*
     * @notice - returns the address registered for a specific domain name.
     * @param name - the domain's name.
     */
    function getAddress(string calldata name) public view returns (address) {
        return domains[name];
    }

    /*
     * @notice - sets a record for a specific domain name.
     * @param name - the domain's name.
     * @param record - the record to store.
     */
    function setRecord(string calldata name, string calldata record) public {
        require(
            domains[name] == msg.sender,
            "Only the owner of the domain can set a record"
        );

        records[name] = record;
    }

    /*
     * @notice - returns a record stored for a specific domain name.
     * @param name - the domain's name.
     */
    function getRecord(string calldata name)
        public
        view
        returns (string memory)
    {
        return records[name];
    }
}
