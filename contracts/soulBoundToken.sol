// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./ERC721.sol";
import "./ERC721Enumerable.sol";
import "./ERC721URIStorage.sol";


contract soulboundToken is ERC721, ERC721Enumerable,ERC721URIStorage{
        
    uint256 TotalTokenCount;
    mapping(uint256 => bool) _locked;
    constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol) {}
    
    function createNFT(string memory uri) public {             
        _safeMint(msg.sender, TotalTokenCount);                                                             //minting of nft
        _setTokenURI(TotalTokenCount, uri); 
        _locked[TotalTokenCount] = true;                                                               //set the token URI
        TotalTokenCount +=1;
    }

    function destroyNFT(uint256 tokenId) public {
        require(msg.sender == ownerOf(tokenId),"Only Owner can destroy the NFT");
        _burn(tokenId);      
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage){
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory){
        return super.tokenURI(tokenId);
    }

    // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override(ERC721, ERC721Enumerable)
    {
        require(!_locked[tokenId],"Cannot transfer SBT");
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
