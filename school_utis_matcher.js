const fs = require('fs');
const realData = require('./general.json');
const filename = require('./testcases.js');
const {findUtisFromLine,findNameFromLine,findSurnameFromLine,convertString,findNameFromData,calculateSimilarityPercentage,findSchoolFromData,findSchoolFromLine} = require('./helper.js');

function matchandlog(line,index){
    const utis = findUtisFromLine(line);
    const schoolInLine = findSchoolFromLine(line);
    const schoolInData = findSchoolFromData(realData,utis);
    if(schoolInData===null){
        console.log(`Utis kod sərfdir:${utis}`);
        return
    }
    if(schoolInLine.toString()!==schoolInData.toString()){
        fs.appendFileSync('./output/outputSchool.txt',`${index+1}:Utis-${utis},Məktəb kodu sərfdir yazıb:${schoolInLine},olmalıdır:${schoolInData}`+'\n');
    }else{
        console.log("Doğrudur")
    }
}
function logAllResult(txtFile){
    const data = fs.readFileSync(`${txtFile}`).toString().split('\n'); 
    for(let i=0;i<data.length;i++){
        setTimeout(()=>{
            matchandlog(data[i],i);
        },i*10)
       
    }
}
logAllResult(filename)
// matchandlog('RAMAL       NAiBOV        HiKMWT     208968211  AK09*51          KDB BBBAAE BBB CCCBDEDABAE',0)