const fs = require("fs")
const filename = require('./testcases.js');
const {findUtisFromLine} = require('./helper.js')
function checkCins(line){
    const cins = line[65];
    const interval1 = line.slice(56,65).split("");
    const interval2 = line.slice(66,84).split("");
    if(interval1.includes['K'] || interval1.includes['Q'] || interval2.includes['K'] || interval2.includes('Q')){
        console.log(`Cins ilə əlaqəli sürüşmə tapıldı-${findUtisFromLine(line)}`);
        return findUtisFromLine(line)
    }
    return false
    // console.log(interval2)
}
function bolme(line){
    
    const bolme = line[48];
    if(!['A','R'].includes(bolme)){
        console.log(`Bölmə ilə əlaqəli sürüşmə tapıldı-${findUtisFromLine(line)}`)
        return findUtisFromLine(line)
    }
    return false
    // console.log(bolme)
}
function fenn(line){
    const fenn = line[49];
    if(!['A','R','F','K','B','T','C'].includes(fenn)){
        console.log(`Fənn ilə əlaqəli sürüşmə tapıldı-${findUtisFromLine(line)}`)
        return findUtisFromLine(line)
    }
    return false
}
//Butun surusmeleri tapir txt filedan
function DetectAllSlidingFromTxt(file){
    const data = fs.readFileSync(`${file}`).toString().split('\n');
    let f = [];
    for(let i of data){
        if(bolme(i)){
            f.push(bolme(i))
        }
        if(checkCins(i)){
            f.push(checkCins(i))
        }
        if(fenn(i)){
            f.push(fenn(i))
        }
    }
    let res = [];
    for(let i of f){
        if(!res.includes(i)){
            res.push(i)
        }
    }
    return res
}
console.log(DetectAllSlidingFromTxt(filename))