const fs = require('fs');
const realData = require('./general.json');
const filename = require('./testcases.js');
const {findUtisFromLine} = require('./helper.js')
function extractFromObj(general){
    const data = [];
    for(let i of general){
        data.push(String(i["Utis"]));
    }
    return data
}
//Qeydiyyatda olmayan utis kodları tapır
function detectIllegalUtis(file){
    const data = fs.readFileSync(`./${file}`).toString().split('\n');
    const legalUtisData = extractFromObj(realData);
    // console.log(legalUtisData)
    const illegalUtis = [];
    for(let line of data){
        if(!legalUtisData.includes(findUtisFromLine(line))){
            illegalUtis.push(findUtisFromLine(line));
            console.log(`Problem detected at line:${data.indexOf(line)},UTIS:${findUtisFromLine(line)}`);           
        }
    }
    return illegalUtis;
}
console.log(detectIllegalUtis(filename))