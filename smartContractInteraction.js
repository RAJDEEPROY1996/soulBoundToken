const Web3 = require('web3');
const HDWalletProvider = require('./node_modules/@truffle/hdwallet-provider');
const contractInfo = require('./contractInfo.js')
require('../node_modules/dotenv').config({ path: '../.env' });
const{privateKey2} = process.env;
const CAddress =contractInfo.address;
//Create a ERC20 smart contract with a name of your choice and mint 100 tokens of it 
console.log("The contract is deployed at address: ",contractInfo.address)

let web3;
let accounts;
let Owner;
let instance;


const Connect = async() => {
  const provider = new HDWalletProvider(privateKey2,`https://data-seed-prebsc-2-s1.binance.org:8545/`);
  web3 = new Web3(provider);
  let abi = contractInfo.abi
 
  instance = new web3.eth.Contract(abi,CAddress,);
  accounts = await web3.eth.getAccounts()
  Owner = accounts[0];
  console.log(Owner);
}


const mintToken = async(uri) => {  
    accounts = await web3.eth.getAccounts()
    await instance.methods.createNFT(uri) .send({from: accounts[0],gas: 8500000}).then(()=>{
      console.log("---------------------------");
      console.log("minted certificate for ",accounts[0]);
      console.log("---------------------------");
    });  
}

const balanceOfOwner = async(walletAddress) => {
  accounts = await web3.eth.getAccounts()
  //Owner
  await instance.methods.balanceOf(walletAddress).call()
  .then(bal =>{
    console.log("---------------------------");
    console.log("balance of wallet Address -> ",web3.utils.fromWei(bal, 'ether'));
    console.log("---------------------------");
  });
}

Connect();
// mintToken(100000000000000000000n)
// balanceOfOwner("0xd26c85218Bfc7045CB0F0D03D202FAEC6c5cFDE9");
// balanceOfOwner("0x8F06f3E3c0ddDCaF8525f1AE3723C9F2f19D610b");



