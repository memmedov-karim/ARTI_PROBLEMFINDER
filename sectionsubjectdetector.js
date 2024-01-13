const fs = require("fs");
const realData = require('./general.json');
const filename = require('./testcases.js');
const findSecSub = (utis,section) => {
    const data = realData.find(obj=>String(obj["Utis"]) === utis);
    if(!data){
        console.log(`Utis kod səhfdir-${utis}`);
    }
    else{
        const secGen = data["Bölmə"];
        if(section !== secGen){
        // console.log(data)
            console.log(`Utis-${utis},bolme-(${section}->${secGen})`)
        }
    }
}
const resBolme = (file) => {
    const data = fs.readFileSync(`${file}`).toString().split('\n');
    for(let i of data){
        findSecSub(i.slice(37, 44),i[48]); 
    }
}
const findSub = (utis,sub) => {
    const data = realData.find(obj=>String(obj["Utis"]) === utis);
    if(!data){
        console.log(`Utis kod səhfdir-${utis}`);
    }
    else{
        const subor = data["Fənn"][0];
        if(sub !== subor){
        // console.log(data)
            console.log(`Utis-${utis},fenn-(${sub}->${subor})`)
        }
    }
}
const resFenn = (file) => {
    const data = fs.readFileSync(`${file}`).toString().split('\n');
    for(let i of data){
        findSub(i.slice(37, 44),i[49]); 
    }
}
// resBolme(filename);
resFenn(filename);