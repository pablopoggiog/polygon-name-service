// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.10;

import {StringUtils} from "./libraries/StringUtils.sol";
import "hardhat/console.sol";

/**
 * @title Domains
 * Domains - Contract that creates and stores domains in the blockchain.
 */
contract Domains {
    /**
     * @dev - Stores the domain's TLD.
     */
    string public tld;
    /**
     * @notice - Stores addresses of the owners of all the domains, indexed by domain's name.
     */
    mapping(string => address) public domains;
    /**
     * @notice - Stores records for domains, indexed by domain's name.
     */
    mapping(string => string) public records;

    /**
     * @dev - Sets the value for `tld` and logs it to the console.
     * @param _tld - The value to be set for `tld`.
     */
    constructor(string memory _tld) payable {
        tld = _tld;
        console.log("%s name service deployed", _tld);
    }

    /**
     * @notice - Gives the price of a domain based on its name's length.
     * @param name - The name for the domain to be registered.
     * @return - The price for that domain.
     */
    function getPrice(string calldata name) public pure returns (uint256) {
        uint256 len = StringUtils.strlen(name);
        require(len > 0);
        if (len == 3) {
            return 5 * 10**17; // 0.5 MATIC
        } else if (len == 4) {
            return 3 * 10**17;
        } else {
            return 1 * 10**17;
        }
    }

    /**
     * @notice - Registers a domain name, mapping it to the caller's address.
     * @param name - The name for the domain to be registered.
     */
    function register(string calldata name) public payable {
        require(domains[name] == address(0), "Name is already in use");

        uint256 _price = getPrice(name);

        require(msg.value >= _price, "Not enough MATIC paid");

        domains[name] = msg.sender;
        console.log("%s has registered a domain!", msg.sender);
    }

    /**
     * @notice - Returns the address registered for a specific domain name.
     * @param name - The domain's name.
     * @return - The address registered for that domain.
     */
    function getAddress(string calldata name) public view returns (address) {
        return domains[name];
    }

    /**
     * @notice - Sets a record for a specific domain name.
     * @param name - The domain's name.
     * @param record - The record to store.
     */
    function setRecord(string calldata name, string calldata record) public {
        require(
            domains[name] == msg.sender,
            "Only the owner of the domain can set a record"
        );

        records[name] = record;
    }

    /**
     * @notice - returns a record stored for a specific domain name.
     * @param name - The domain's name.
     * @return - The record stored in that domain.
     */
    function getRecord(string calldata name)
        public
        view
        returns (string memory)
    {
        return records[name];
    }
}
