// SPDX-License-Identifier: MIT
// 1. Pragma
pragma solidity ^0.8.7;

error bank__NotOwner();

contract ClientRegistry {
    struct client {
        string name;
        uint256 cin;
        bool isprocessed;
        bool isaccepted;
        uint256 proofOfExistance;
    }
    address private bank_muhafiz_id;
    mapping(uint256 => client) clientsbyIds;
    uint ClientsCount; 
    constructor() {
        bank_muhafiz_id = msg.sender;
    }

    modifier onlyOwner() {
        // require(msg.sender == i_owner);
        if (msg.sender != bank_muhafiz_id){ 
            
        revert bank__NotOwner();}
        _;
    }

    function addclient(string memory name, uint256 cin) public {
        client memory clt = client(name, cin, false, false, 1);
        if (ClientExistsById(cin) == false) 
       { clientsbyIds[ClientsCount] = clt;
        ClientsCount++;}
    }
    function getcltindex(uint256 clientid) public view returns (uint256)
    {
        for (uint256 i = 0; i < ClientsCount; i++) {
            if(clientsbyIds[i].cin==clientid)
                return i;
        }
        return 0;

    }
    function CheckisProcessedbyId(uint256 Id) public view returns (bool) {

        if(ClientExistsById(Id))
        {
        return clientsbyIds[getcltindex(Id)].isprocessed;
        }
        else 
        return false;
    }

    function CheckisAcceptedbyId(uint256 Id) public view returns (bool) {
        return clientsbyIds[getcltindex(Id)].isaccepted;
    }

    function ClientExistsById(uint256 id) public view onlyOwner  returns (bool) {
        for (uint i = 0; i < ClientsCount; i++) {
        if(clientsbyIds[getcltindex(id)].cin==id)
        return true;
        }
        return false;
    }

    function ProcessCLient(bool isaccepted, uint256 clientid) public onlyOwner {
        if (ClientExistsById(clientid)){
            clientsbyIds[getcltindex(clientid)].isaccepted = isaccepted;
        clientsbyIds[getcltindex(clientid)].isprocessed = true;}
    }
    function cltname(uint256 id) public view   returns (string memory){
      if (ClientExistsById(id)){
          return clientsbyIds[getcltindex(id)].name;
      }
      else
      return "notfound";
    }
    function getclients() public view onlyOwner returns (client[] memory){
        client[] memory clients = new  client[](ClientsCount);
    for (uint i = 0; i < ClientsCount; i++) {
        clients[i] = clientsbyIds[i];
    }
        return clients;
    }
}
