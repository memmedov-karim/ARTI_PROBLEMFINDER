const realData = require('./general.json');
const fs = require('fs');
const filename = require('./testcases');
function findUtisFromLine(line) {
    const utis = line.slice(37, 44);
    return utis.trim();
}
function findNameFromLine(line){
    const name = line.slice(0, 12);;
    return name.trim();
}
function findSurnameFromLine(line){
    const sur = line.slice(12, 26);;
    return sur.trim();
}

function convertString(inputStr) {
    const conversionDict = {'W': 'ə', 'c': 'ç', 'g': 'ğ', 'o': 'ö', 'u': 'ü'};
    let resultStr = '';
    for (let char of inputStr) {
        resultStr += conversionDict[char] || char;
    }
    return resultStr.toLowerCase();
}

function findNameFromData(data,utis){
    let user = data.find(ob=>String(ob["Utis"]) === utis);
    let neww = {
        nameInData:user?.Ad.toLowerCase(),
        surnameInData:user?.Soyad.toLowerCase(),
        fatherNameInData:user?.['Ata adı']?.split(" ")[0].toLowerCase()
    }
    return user ? neww : null;
}
console.log(findNameFromData(realData,'123456'))
function findSchoolFromLine(line){
    const mkod = line.slice(50, 55);
    return mkod
}
function findSchoolFromData(data,utis){
    let user = data.find(ob=>String(ob["Utis"]) === utis);
    let use = user?.mkod || null;
    return use
}
// console.log(findSchoolFromData(realData,'1207542'))
function calculateSimilarityPercentage(str1, str2) {
    const calculateLevenshteinDistance = (s1, s2) => {
        const dp = Array.from({ length: s1.length + 1 }, () => Array(s2.length + 1).fill(0));
        for (let i = 0; i <= s1.length; i++) {
            for (let j = 0; j <= s2.length; j++) {
                if (i === 0) {
                    dp[i][j] = j;
                } else if (j === 0) {
                    dp[i][j] = i;
                } else {
                    const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;
                    dp[i][j] = Math.min(
                        dp[i - 1][j] + 1,
                        dp[i][j - 1] + 1,
                        dp[i - 1][j - 1] + cost
                    );
                }
            }
        }
        return dp[s1.length][s2.length];
    };
    const maxLen = Math.max(str1.length, str2.length);
    const distance = calculateLevenshteinDistance(str1, str2);
    const similarityPercentage = ((maxLen - distance) / maxLen) * 100;
    return similarityPercentage;
}
module.exports = {findUtisFromLine,findNameFromLine,findSurnameFromLine,convertString,findNameFromData,calculateSimilarityPercentage,findSchoolFromData,findSchoolFromLine};