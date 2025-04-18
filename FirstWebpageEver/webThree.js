const { spec } = require('mocha/lib/reporters');
const Web3 = require('web3');
const { update, database, search, loadJson, saveJson } = require('./setter'); 
const web3 = new Web3('https://speedy-nodes-nyc.moralis.io/082bafe10f18621bcff46074/polygon/mainnet');

var contractData = loadJson("./contract.json")
var eventData = loadJson("./public/events.json")
var myContract = new web3.eth.Contract(contractData.abi, contractData.address)
// console.log(myContract.methods)
var looksy = `<div class="block1">
<h1 class="bigtxt">EVENTS</h1>
<div id="event_feed">
    {%event1%}
    {%event2%}
    {%event3%}
    {%event4%}`

    function setPopulation(SID){
        let global_minted = myContract.methods.totalSupply().call((err, result)=>{
        setMinted(SID, result)
        setGlobalMinted(result)
        })
    }

    function setMinted(spec, minted) {
        var currentSpec = search(spec).specimen
        if(minted == currentSpec.minted){}
        else{
        currentSpec.minted = minted
        update(spec, currentSpec)
        console.log(`specimen ${currentSpec.SID} updated`)    
        }
    
    }

    function setGlobalMinted(minted) {
        var currentEvents = eventData
        currentEvents.globalMint = minted
        saveJson(currentEvents, "./public/events.json")
    }


    function trunc(address) {
        if (!address) {
          return "";
        }
        return `${address.substr(0, 5)}...${address.substr(
          address.length - 5,
          address.length
        )}`;
      
    }

module.exports = {setPopulation}