const { ethers } = require("ethers");

require('dotenv').config();

const url=process.env.GANACHE_URL;
const provider = new ethers.providers.JsonRpcProvider(url);
const wallet =new ethers.Wallet("e038c3557f48ea93b3e730d257ca3c1a4ce86c106f8bd3a3e1548079daed0d93",provider);
const signer = provider.getSigner();
const ERC20_ABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "bank__NotOwner",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "cin",
        "type": "uint256"
      }
    ],
    "name": "addclient",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "clientid",
        "type": "uint256"
      }
    ],
    "name": "getcltindex",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "Id",
        "type": "uint256"
      }
    ],
    "name": "CheckisProcessedbyId",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "Id",
        "type": "uint256"
      }
    ],
    "name": "CheckisAcceptedbyId",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      }
    ],
    "name": "ClientExistsById",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "bool",
        "name": "isaccepted",
        "type": "bool"
      },
      {
        "internalType": "uint256",
        "name": "clientid",
        "type": "uint256"
      }
    ],
    "name": "ProcessCLient",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      }
    ],
    "name": "cltname",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "getclients",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "cin",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "isprocessed",
            "type": "bool"
          },
          {
            "internalType": "bool",
            "name": "isaccepted",
            "type": "bool"
          },
          {
            "internalType": "uint256",
            "name": "proofOfExistance",
            "type": "uint256"
          }
        ],
        "internalType": "struct ClientRegistry.client[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  }
];

const address = '0x314604E24CFE571CA60282757160ea3241543F87' // DAI Contract //rooba 3arbi


const contract = new ethers.Contract(address, ERC20_ABI,signer)

const main = async (personofintrest) => {
    const person= await contract.ClientExistsById(personofintrest);
    const isprocessed = await contract.CheckisProcessedbyId(personofintrest);
    const name = await contract.cltname(personofintrest);
    console.log(`\nReading from ${address}\n`);
    console.log(`\nReading from ${name}\n`);
    console.log(`bool clients exists by id(${personofintrest}) is : ${person}`);
    console.log(`bool clients is processed:${isprocessed}`)

}
const addperson = async (name,id) => {
  await contract.addclient(name,id);
}
const ProcessCLient = async (verdict,id) =>{
  const isprocessed = await contract.CheckisProcessedbyId(id);
  if (!isprocessed)
    await contract.ProcessCLient(verdict,id);
}


// addperson("mahdoush",69)
// ProcessCLient(true,69)
ProcessCLient(true,6969);
