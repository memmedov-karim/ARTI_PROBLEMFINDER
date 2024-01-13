const fs = require('fs');
const realData = require('./general.json');
const filename = require('./testcases.js');
const {findUtisFromLine,findNameFromLine,findSurnameFromLine,convertString,findNameFromData,calculateSimilarityPercentage} = require('./helper.js');

function checkSimilarityForOneLine(line,index,min_persentage){
    const utis = findUtisFromLine(line);
    const nameInLine = convertString(findNameFromLine(line)).toLowerCase();
    const surnameInLine = convertString(findSurnameFromLine(line)).toLowerCase();
    const {nameInData,surnameInData} = findNameFromData(realData,utis);
    if(nameInData===undefined || surnameInData===undefined){
        console.log(`Utis kod sərfdir:${utis}`);
        return
    }
    // console.log(utis)
    // console.log(nameInLine,nameInData);
    // console.log(surnameInLine,surnameInData);
    const nameSimilarity = calculateSimilarityPercentage(nameInData,nameInLine);
    const surnameSimilarity = calculateSimilarityPercentage(surnameInData,surnameInLine);
    const totalSimilarity = (nameSimilarity+surnameSimilarity)/2;
    console.log(`${index+1}:Utis-${utis},Doğruluq ehtimalı=${totalSimilarity}`);
    if(totalSimilarity<min_persentage){
        fs.appendFileSync('./output/output.txt',`${index+1}:Utis-${utis},Doğruluq ehtimalı=${totalSimilarity}`+'\n');
    }
}
function logAllResult(txtFile,min_persentage){
    const data = fs.readFileSync(`${txtFile}`).toString().split('\n'); 
    for(let i=0;i<data.length;i++){
        setTimeout(()=>{
            checkSimilarityForOneLine(data[i],i,min_persentage);
        },i*10)
    }
    console.log('Yoxlanış uğurla tamamlandı')
}
logAllResult(filename,70)
// checkSimilarityForOneLine('RAMAL       NAiBOV        HiKMWT     248968211  AK09561          KDB BBBAAE BBB CCCBDEDABAE',0)