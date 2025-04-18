let fs = require('fs');

function loadJson(filename = ''){
    return JSON.parse( //turns json to object for us to edit
        fs.readFileSync(filename).toString()
    )
}

function saveJson(theObject, toWhere = ''){
    newJsonData = JSON.stringify(theObject); //turn back into a json
          fs.writeFile(toWhere, newJsonData, function(err){
              if(err) {console.log(err)}
          });
}

//---DATA
const data = loadJson("./public/database.json");
const database = data.list;


//---SAVE NEW SPEC
function saveSpec(theObj){
    let _spec = search(theObj.name)
    if(_spec.status == true){console.log("already in database")}
    else{
    var db = {list: database};
    db.list.push(theObj);
    saveJson(db, "./public/database.json");
    console.log(theObj.name + "was saved on index " + db.list.length - 1)            
    }
    
}

//---UPDATE
function update(nameOrSid, fixedObj){
    let _spec = search(nameOrSid)
    if(_spec.specimen.name != fixedObj.name){console.log("whollon sum dont match")}
    else{
    let db = data.list
    
    db[_spec.index] = fixedObj;
    let _update = {list: db}
    
    saveJson(_update, "./public/database.json")
    
    }

}

//---SEARCH
function search(nameOrSid){
    let contain = false;
    let current = database
    let _index = 0;
    let _data;

    current.forEach((element) => {
        if(nameOrSid === element.name || nameOrSid == element.SID){
        contain = true;
        _data = {status: contain, index: _index, specimen: element}
        console.log("search returned:", `${_data.specimen.name} ${_data.specimen.SID}`)
        }
        _index++
    });

    if(contain === false){
    console.log("specimen not found")
    _data = {status: false}
    }

    return _data;
}


//---DELETE
function deleteEl(deleteOrRestore = ""){
let specList = database;
let safePointData;
const _looking = search(deleteOrRestore);

    if(deleteOrRestore === "delete all"){
        safePointData = {list: specList}
        saveJson(safePointData,"./restore.json")
        console.log(specList)

        let nullify = {list: []}
        console.log("has now been deleted")
        saveJson(nullify,"./public/database.json")
    }

    else if(_looking.status == true){
    let updated = []
    let _name = deleteOrRestore;
    let done = {list: updated}

    specList.forEach((el)=>{
        if(el.name == _name || el.SID == _name){
        console.log(`deleted: ${el.name}`)
        }else{updated.push(el)}
        })
        saveJson(done, "./public/database.json")
    }

    else if(deleteOrRestore === "restore"){
        if(safePointData.length == 0 || safePointData == undefined){
        console.log("no data")
        }else{
        saveJson(safePointData, "./public/database.json")
        }   
    }

    else console.log("connot preform action")
}













//====create New spec====//
let MB =  {
    img: 'https://gateway.pinata.cloud/ipfs/QmUnP45cNk3aQVEeTRRxWVS7GokAJrhQqdgVzawVxG6xsA?filename=FullMetal%2528box%2529.gif',
    SID: 102,
    name: 'Mighty Bird',
    form: '1 of 1',
    class: 'Devine',
    population: 4128,
    minted: 0,
    purg: 'Mighty',
    abilities: 'Nest Cannon',
    build: 'Colors',
    openSea: 'https://opensea.io/assets/matic/0xfb7bbaa0c62cb64fe10c9fea4497df546b6a590c/14',
    display: 'https://ipfs.io/ipfs/QmdVDx5VWCaM4ZdDWkVJKTMZbTEMbDgiHygSM9npYDpJuk/',
    discription: 'Hello this is the description of Mighty bird'
  }

let newSpecimen = {
    img: "https://gateway.pinata.cloud/ipfs/QmUnP45cNk3aQVEeTRRxWVS7GokAJrhQqdgVzawVxG6xsA?filename=FullMetal%2528box%2529.gif",
    SID: 101,
    name: "Demigora",
    form: "1 of 1",
    class: "Devine",
    population: 721,
    minted: 0,
    purg: "Mighty",
    abilities: "Sofi Lofi",
    build: "Base",
    openSea: "https://opensea.io/assets/matic/0xfb7bbaa0c62cb64fe10c9fea4497df546b6a590c/14",
    display: "https://ipfs.io/ipfs/QmdVDx5VWCaM4ZdDWkVJKTMZbTEMbDgiHygSM9npYDpJuk/",
    discription: "Hello this is the description of Demigora God of the Sword"
}

// console.log(database, `database length is ${database.length}`);
// saveSpec(MB);
// search('101');
// deleteEl('delete all');
// update()

module.exports = {saveSpec, search, database, update, deleteEl, loadJson, saveJson}