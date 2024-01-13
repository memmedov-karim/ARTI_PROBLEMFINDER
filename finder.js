const realData = require("./general.json");
const fs = require("fs");
const {findUtisFromLine} = require('./helper.js')
function findCent(utis){
  let m = realData.find(ob=>String(ob["Utis"]) === utis);
  if(!m) return "Utis erfdi"
  return m["Mərkəz"]
}
function find(Data) {
  const data = [];
  for (let i of Data) {
    // console.log(i["Utis"])
    if (i["Qısa ad mərkəz"] === "Goranboy 1") { 
      // console.log(i["Utis"])
      data.push(String(i["Utis"]));
    }
  }
  return data;
}
// console.log(find(realData))
// for(let i of find(realData)){
//     console.log(i)
// }
// console.log(Array.from(new Set(find(realData))));
//SINIF UTIS KITABCADILI
//Qeydiyyatda olmayan utis kodları tapır
function detectUtises(file) {
  const data = fs.readFileSync(`./${file}`).toString().split("\n");
  // console.log(legalUtisData)
  const utises = [];
  for (let line of data) {
    utises.push(findUtisFromLine(line));
  }
  return utises;
}
// for(let i=0;i<detectUtises('Lerik3.txt').length;i++){
//     console.log(`${i+1}:${detectUtises('Lerik3.txt')[i]}`)

// }
// for(let i of detectUtises('m.txt')){
//   console.log(findCent(i),i)
// }
// console.log(detectUtises("BAKI 14.txt"))
function findGen(big, small) {
  let res = [];
  for (let i of big) {
    if (!small.includes(i)) {
      res.push(i);
    }
  }
  return res;
}
//. console.log(findGen(find(realData),detectUtises("236.txt")).length)
// for(let i of findGen(find(realData),detectUtises("m.txt"))){
//     console.log(i)
// }
// console.log(detectUtises('236.txt'))


const dataAll = find(realData);
console.log(dataAll)
const dataParticipants = detectUtises('GORANBOY.txt');

for(let i of dataAll){
    if(!dataParticipants.includes(i)){
        console.log(`${i}`)
    }
}