import Head from "next/head";
import Image from "next/image";
import Link from 'next/link';
import { ethers } from "ethers";
import { useEffect, useState } from "react";

export default function eadminfind() {
  const [isConnected, setIsConnected] = useState(false);
  const [personname, setname] = useState("undefined");
  const [hasMetamask, setHasMetamask] = useState(false);
  const [signer, setSigner] = useState(undefined);
  const [personfound,setpersonfound]=useState(false);
  const url='HTTP://127.0.0.1:7545';
  let isprocessed=false;
  let cin =0;
  let accepted =false;

const provider = new ethers.providers.JsonRpcProvider(url);
const wallet =new ethers.Wallet("e038c3557f48ea93b3e730d257ca3c1a4ce86c106f8bd3a3e1548079daed0d93",provider);
const mysigner = provider.getSigner();
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


const contract = new ethers.Contract(address, ERC20_ABI,mysigner)

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setHasMetamask(true);
    }
  });

  async function connect() {
  
      try {
        await ethereum.request({ method: "eth_requestAccounts" });
        setIsConnected(true);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setSigner(provider.getSigner());
      } catch (e) {
        console.log(e);
      }

    } 

  async function interact(personofintrest)
  {

    const  tpersonname= await contract.cltname(personofintrest);
    
    setname(tpersonname);
    isprocessed = await contract.CheckisProcessedbyId(personofintrest);
    accepted = await contract.CheckisAcceptedbyId(personofintrest);
    let cinbool = await contract.ClientExistsById(personofintrest);
    if(cinbool)
      cin = personofintrest;



  }


  async function getclient()
  {
    const id= document.querySelector('#cin').value;
    console.log(id);
    interact(id);
  document.getElementById('app').innerHTML="";
  const app = document.getElementById('app');
  const header = document.createElement('h1');
  const headerContent1 = document.createTextNode(`Name:${personname}   `);

  const headerContent2 = document.createTextNode(`cin:${cin}   `);

  const headerContent3 = document.createTextNode(`accepted:${accepted}   `);

  header.appendChild(headerContent1);
  header.appendChild(headerContent2);

  header.appendChild(headerContent3);

  app.appendChild(header);
  }





  return (
   
    <div>
      {hasMetamask ? (
        isConnected ? (
          <div>
            
            <style jsx>{`

  * {
    margin: 0;
    padding: 30px;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
  }

  body {
    background: #ffffff;
    font-family: "Rubik", sans-serif;
  }

  .login-form {
    background: #fff;
    width: 500px;
    margin: 65px auto;
    display: -webkit-box;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    flex-direction: column;
    border-radius: 4px;
    box-shadow: 0 2px 25px rgba(0, 0, 0, 0.2);
  }
  .login-form h1 {
    padding: 35px 35px 0 35px;
    font-weight: 300;
  }
  .login-form .content {
    padding: 35px;
    text-align: center;
  }
  .login-form .input-field {
    padding: 12px 5px;
  }
  .login-form .input-field input {
    font-size: 16px;
    display: block;
    font-family: "Rubik", sans-serif;
    width: 100%;
    padding: 10px 1px;
    border: 0;
    border-bottom: 1px solid #747474;
    outline: none;
    -webkit-transition: all 0.2s;
    transition: all 0.2s;
  }
  .login-form .input-field input::-webkit-input-placeholder {
    text-transform: uppercase;
  }
  .login-form .input-field input::-moz-placeholder {
    text-transform: uppercase;
  }
  .login-form .input-field input:-ms-input-placeholder {
    text-transform: uppercase;
  }
  .login-form .input-field input::-ms-input-placeholder {
    text-transform: uppercase;
  }
  .login-form .input-field input::placeholder {
    text-transform: uppercase;
  }
  .login-form .input-field input:focus {
    border-color: #222;
  }
  .login-form a.link {
    text-decoration: none;
    color: #747474;
    letter-spacing: 0.2px;
    text-transform: uppercase;
    display: inline-block;
    margin-top: 20px;
  }
  .login-form .action {
    display: -webkit-box;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    flex-direction: row;
  }
  .login-form .action button {
    width: 100%;
    border: none;
    padding: 18px;
    font-family: "Rubik", sans-serif;
    cursor: pointer;
    text-transform: uppercase;
    background: #484a50;
    color: rgb(255, 255, 255);
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 0;
    letter-spacing: 0.2px;
    outline: 0;
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
  }
  .login-form .action button:hover {
    background: #524c4c;
  }
  .login-form .action button:nth-child(2) {
    background: rgba(40, 43, 46, 0.733);
    color: rgb(255, 255, 255);
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 4px;
  }
  .login-form .action button:nth-child(2):hover {
    background: #898e96;
  }


  `}

            </style>
            <div className="login-form">
            
                <div className="content">
                <h1>Adiministrator Connected </h1>
            <h4>find client by id </h4>
                    <input  className="input-field" placeholder="national identity card number" type="text" name="CIN" id="cin" />
                    <div className="action">
                      <button onClick={e=>getclient()}>find by id</button>
                      <Link href ='eadminprocess'><button>process by id</button></Link>
                    </div>
                    <div id="app"></div>
                </div>
            </div>
            <table class="table">
    <thead  class="thead-dark">
    <tr>
        <th scope="col">client cin</th>
        <th scope="col">client name</th>
        <th scope="col">client proccessed</th>
        <th scope="col">cleint accepted</th>

     
    </tr>
    </thead>
    <tbody>
        <tr >
        <th scope="col">404</th>
        <th scope="col">dummy client</th>
        <th scope="col">true</th>
        <th scope="col">true</th>
        </tr>
    </tbody>

</table>

          </div>          
        ) : (
          <button onClick={() => connect()}>Connect</button>
        )
      ) : (
        "Please install metamask"
      )}



      
    </div>
  );
  
}
