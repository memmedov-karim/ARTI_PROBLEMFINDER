const fs = require("fs");
const realData = require('./general.json');
const filename = require('./testcases.js');
function find(line,clas){
    const utis = line.slice(37, 44);
    const data = realData.find(o=>String(o["Utis"])===utis);
    // console.log(utis)
    if(data){
        const classs = String(data["sinif"]).length===1 ?"0"+String(data["sinif"]):String(data["sinif"]);
        // console.log(classs)
    if(clas!==classs){
        console.log(`Utis:${utis};(${clas}->${classs}})`)
    }
    }
}
function res(file){
    const data = fs.readFileSync(`${file}`).toString().split('\n');
    for(let i of data){
        find(i,i.slice(44, 46)); 
    }
}
res(filename) 