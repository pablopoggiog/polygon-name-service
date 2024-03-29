// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

import {StringUtils} from "./libraries/StringUtils.sol";
import {Base64} from "./libraries/Base64.sol";

/**
 * @title Domains
 * @notice - Contract that creates and stores domains in the blockchain.
 * @dev - It inherits from `ERC721URIStorage`.
 */
contract Domains is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    /**
     * @notice - Who deployed the contract.
     */
    address public owner;

    /**
     * @notice - Stores the domain's TLD.
     */
    string public tld;

    string svgPartOne =
        '<svg xmlns="http://www.w3.org/2000/svg" width="270" height="270" fill="none"><path fill="url(#a)" d="M0 0h270v270H0z"/><defs><filter id="b" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse" height="270" width="270"><feDropShadow dx="0" dy="1" stdDeviation="2" flood-opacity=".225" width="200%" height="200%"/></filter></defs><path d="M72.863 42.949a4.382 4.382 0 0 0-4.394 0l-10.081 6.032-6.85 3.934-10.081 6.032a4.382 4.382 0 0 1-4.394 0l-8.013-4.721a4.52 4.52 0 0 1-1.589-1.616 4.54 4.54 0 0 1-.608-2.187v-9.31a4.27 4.27 0 0 1 .572-2.208 4.25 4.25 0 0 1 1.625-1.595l7.884-4.59a4.382 4.382 0 0 1 4.394 0l7.884 4.59a4.52 4.52 0 0 1 1.589 1.616 4.54 4.54 0 0 1 .608 2.187v6.032l6.85-4.065v-6.032a4.27 4.27 0 0 0-.572-2.208 4.25 4.25 0 0 0-1.625-1.595L41.456 24.59a4.382 4.382 0 0 0-4.394 0l-14.864 8.655a4.25 4.25 0 0 0-1.625 1.595 4.273 4.273 0 0 0-.572 2.208v17.441a4.27 4.27 0 0 0 .572 2.208 4.25 4.25 0 0 0 1.625 1.595l14.864 8.655a4.382 4.382 0 0 0 4.394 0l10.081-5.901 6.85-4.065 10.081-5.901a4.382 4.382 0 0 1 4.394 0l7.884 4.59a4.52 4.52 0 0 1 1.589 1.616 4.54 4.54 0 0 1 .608 2.187v9.311a4.27 4.27 0 0 1-.572 2.208 4.25 4.25 0 0 1-1.625 1.595l-7.884 4.721a4.382 4.382 0 0 1-4.394 0l-7.884-4.59a4.52 4.52 0 0 1-1.589-1.616 4.53 4.53 0 0 1-.608-2.187v-6.032l-6.85 4.065v6.032a4.27 4.27 0 0 0 .572 2.208 4.25 4.25 0 0 0 1.625 1.595l14.864 8.655a4.382 4.382 0 0 0 4.394 0l14.864-8.655a4.545 4.545 0 0 0 2.198-3.803V55.538a4.27 4.27 0 0 0-.572-2.208 4.25 4.25 0 0 0-1.625-1.595l-14.993-8.786z" fill="#fff"/><defs><linearGradient id="a" x1="0" y1="0" x2="270" y2="270" gradientUnits="userSpaceOnUse"><stop stop-color="violet"/><stop offset="1" stop-opacity=".99"/></linearGradient></defs><text x="50%" y="231" text-anchor="middle" font-size="27" fill="#fff" filter="url(#b)" font-family="Plus Jakarta Sans,DejaVu Sans,Noto Color Emoji,Apple Color Emoji,sans-serif" font-weight="bold">';
    string svgPartTwo = "</text></svg>";

    /**
     * @notice - Stores addresses of the owners of all the domains, indexed by domain's name.
     */
    mapping(string => address) public domains;

    /**
     * @notice - Stores all the domains' names, indexed by token ID.
     */
    mapping(uint256 => string) public names;

    /**
     * @notice - Stores records for domains, indexed by domain's name.
     */
    mapping(string => string) public records;

    /**
     * @dev - Sets the value of `owner` to who's deploying the contract, `tld` to the param `_tld_` and logs it to the console.
     * @param _tld - The value to be set for `tld`.
     */
    constructor(string memory _tld)
        payable
        ERC721("Zed Run Name Service", "ZNS")
    {
        owner = payable(msg.sender);
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
     * @dev - Requires the caller to be the contract's owner.
     * @param name - The name for the domain to be validated.
     */
    modifier isValidName(string calldata name) {
        require(
            StringUtils.strlen(name) >= 3 && StringUtils.strlen(name) <= 10,
            "Names can have between 3 and 10 chars"
        );
        _;
    }

    /**
     * @notice - Registers a domain name after checking it's valid, mapping it to the caller's address.
     * @param name - The name for the domain to be registered.
     */
    function register(string calldata name) public payable isValidName(name) {
        require(domains[name] == address(0), "Name is already in use");

        uint256 _price = getPrice(name);

        require(msg.value >= _price, "Not enough MATIC paid");

        // Combines the name passed into the function  with the TLD
        string memory _name = string(abi.encodePacked(name, ".", tld));
        // Creates the SVG for the NFT with the name
        string memory finalSvg = string(
            abi.encodePacked(svgPartOne, _name, svgPartTwo)
        );
        uint256 newRecordId = _tokenIds.current();
        uint256 length = StringUtils.strlen(name);
        string memory strLen = Strings.toString(length);

        console.log(
            "Registering %s.%s on the contract with tokenID %d",
            name,
            tld,
            newRecordId
        );

        // Creates the JSON metadata of our NFT. We do this by combining strings and encoding as base64
        string memory json = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{"name": "',
                        _name,
                        '", "description": "A domain on the Ninja name service", "image": "data:image/svg+xml;base64,',
                        Base64.encode(bytes(finalSvg)),
                        '","length":"',
                        strLen,
                        '"}'
                    )
                )
            )
        );

        string memory finalTokenUri = string(
            abi.encodePacked("data:application/json;base64,", json)
        );

        console.log(
            "\n--------------------------------------------------------"
        );
        console.log("Final tokenURI", finalTokenUri);
        console.log(
            "--------------------------------------------------------\n"
        );

        _safeMint(msg.sender, newRecordId);
        _setTokenURI(newRecordId, finalTokenUri);

        domains[name] = msg.sender;
        names[newRecordId] = name;

        _tokenIds.increment();
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
     * @notice - Provides the record stored for a specific domain name.
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

    /**
     * @notice - Provides a list of all the domain names.
     * @return - The list of all the domain names.
     */
    function getAllNames() public view returns (string[] memory) {
        console.log("Getting all names from contract");
        string[] memory allNames = new string[](_tokenIds.current());
        for (uint256 i = 0; i < _tokenIds.current(); i++) {
            allNames[i] = names[i];
            console.log("Name for token %d is %s", i, allNames[i]);
        }

        return allNames;
    }

    /**
     * @dev - Requires the caller to be the contract's owner.
     */
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    /**
     * @notice - Withdraws the contract's balance, only valid for the owner.
     */
    function withdraw() public onlyOwner {
        uint256 amount = address(this).balance;

        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Failed to withdraw Matic");
    }
}
