const fs = require('fs');
const Express = require('express');
const {setPopulation} = require('./webThree')
const app = new Express();


//top level
function read(fileName = ""){
    const file = fs.readFileSync(fileName, "utf-8", (err, data)=>{
        return data
    })  
    return file;  
}
     
const home = read("./public/index.html");


//server start
app.get('/', (req, res) => {
    // setPopulation(102)
    res.send(home);
    console.log("you have a user...");    
});


app.listen(3000, () => console.log('listening on port 3000'));
app.use(Express.static(`${__dirname}/public`));



