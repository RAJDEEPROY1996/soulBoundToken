// Requiring the module
const reader = require('xlsx')
const hummus =  require('hummus-recipe');
const pinataSDK = require('@pinata/sdk');
const fs = require('fs')
const cid = []
require('dotenv').config();
const{PinataApiKey ,PinataSecretApiKey} = process.env;
const pinata = pinataSDK(PinataApiKey, PinataSecretApiKey);
pinata.testAuthentication().then((result) => {
    //handle successful authentication here
    console.log(result);
}).catch((err) => {
    //handle error here
    console.log(err);
});
// Reading our test file
const file = reader.readFile('./result.xlsx')

let data = []

const sheets = file.SheetNames

for(let i = 0; i < sheets.length; i++)
{
const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]])
temp.forEach((res) => {
	data.push(res) 
    const pdfDoc = new hummus('new','pdfOutput/'+res.Rank+'.pdf');
    var readableStreamForFile = fs.createReadStream('pdfOutput/'+res.Rank+'.pdf');
    pdfDoc.createPage('A4')
    .text("Web3Nest Metaverse Private Limited",'center', 100, {
        color: '#066099',
        fontSize: 30,
        bold: true,
        font: 'Helvatica',
        align: 'center center',
        opacity: 0.8,
        rotation: 0  
    })
    .text("This is to certify that " + res.Name.toUpperCase() + " has successfully completed the Blockchain Development Course and received "+ res.RecognitionType.toUpperCase() + " .",'center', 400, {
        color:"#000000",
        fontSize: 20,
        bold: true,
        font: 'Courier New',
        align: 'center center',
        opacity: 0.8,
        rotation: 0,    
    textBox: {
        width: 450,
        lineHeight: 16,
        padding: [5, 15],
    }
    })
    .image("logo.jpg",150,150)    
    .image("sign.jpg",150,450)
    .endPage()
    .endPDF()
    pinata.pinFileToIPFS(readableStreamForFile).then((result) => {
        //handle results here
        //console.log(result);
        a = {
            roll : res.Rank,
            ipfs: result.IpfsHash
        }
        cid.push(a)
        console.log("Cid \n",cid)
    }).catch((err) => {
        //handle error here
        console.log(err);
    });        
})
}

/*uploaded Certificate in IPFS

Cid
 [
  { roll: 3, ipfs: 'QmTnMhad2JHH5eFrT8R3uYarEkYhajWkbvL41KiwrEoENq' },
  { roll: 10, ipfs: 'QmR2nEZRJZ6PVDUvAPmG3aqMynYMZ4meMJc85WvVyZDpMC' },
  { roll: 7, ipfs: 'QmZ3hjyKNuVWyJ29VExHrujZLqxrkLR9gAH7sP3TWoLge6' },
  { roll: 4, ipfs: 'QmPo2K5Bv9NcsAFnH2dAW2citLfv7fPdJpbNJGbgSCCRCk' },
  { roll: 8, ipfs: 'QmSNvVRdk3zfGbLXUm8K51oSv6LxNYjKNjauSnW6XS2kwd' },
  { roll: 2, ipfs: 'QmV2546Fge5kveS8Q62419tos7sKSjYAoJ1gtvLWVcYf2w' },
  { roll: 1, ipfs: 'QmXiPQnyz6B8Jm3a5MRZ9nTeCLZwxXQapbQPgqVjUBWdN5' },
  { roll: 6, ipfs: 'QmSFRAP7t51F1CCyFX46JqHywcq9GhzXSeURR11jJgdFwH' },
  { roll: 9, ipfs: 'QmRQvviXJ3QPuTdufjAUPhr2nJiyR5oh3nYiUp3PRNm9Zd' },
  { roll: 5, ipfs: 'QmaME71iFP18huebpk6kT8r1oYPotLqgAWEjb2uahotE98' }
]

*/