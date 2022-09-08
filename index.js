//1041303316
const fetch = require('node-fetch');
const prompt = require('prompt-sync')();
const name = prompt('Enter your username: ');
const delay = timeToWait => new Promise(resolve => setTimeout(resolve, timeToWait));
let id;
let bodyData;
let tankA = {
  usa: [],
  uk: [],
  germany: [],
  ussr: [],
  france: [],
  japan: [],
  china: [],
  european: [],
  other: [],
};
(async () => {
  id = await userNameToID(name);
  bodyData = await getAccountTanks(id);
  await getMainTankStats(bodyData, tankA);
  console.log('\nAmerican');
  printFromArrayInObject(tankA, 'usa');
  console.log('\British');
  printFromArrayInObject(tankA, 'uk');
  console.log('\nGerman');
  printFromArrayInObject(tankA, 'germany');
  console.log('\nSoviet');
  printFromArrayInObject(tankA, 'ussr');
  console.log('\nFrench');
  printFromArrayInObject(tankA, 'france');
  console.log('\nJapanese');
  printFromArrayInObject(tankA, 'japan');
  console.log('\nChinese');
  printFromArrayInObject(tankA, 'china');
  console.log('\nEuropean');
  printFromArrayInObject(tankA, 'european');
  console.log('\nHybrid');
  printFromArrayInObject(tankA, 'other');
})();





async function userNameToID(name) {
  const response = await fetch('https://api.wotblitz.com/wotb/account/list/?application_id=050744d1881d6e55169c3b169dfa1fde&search=' + name);
  const body = await response.json();
  return body.data[0].account_id;
}

async function getAccountTanks(id) {
  const response = await fetch('https://api.wotblitz.com/wotb/tanks/achievements/?application_id=050744d1881d6e55169c3b169dfa1fde&account_id=' + id);
  const body = await response.json();
  return body.data[id];
}

async function getMainTankStats(bodyData, tankArray) {
  for (const singleStat of bodyData) {
    let tankID = singleStat.tank_id;
    const response = await fetch('https://api.wotblitz.com/wotb/encyclopedia/vehicles/?application_id=050744d1881d6e55169c3b169dfa1fde&tank_id=' + tankID);
    const body = await response.json();
    tankA[body.data[tankID].nation].push(body.data[tankID]);
  };
}

function printFromArrayInObject(objectName, giveArrayName){
  let tempArray = [];
  for(let i=0; i<objectName[giveArrayName].length; i++){
    tempArray.push('Tier ' + objectName[giveArrayName][i].tier + ' '+ objectName[giveArrayName][i].name);
    if(objectName[giveArrayName][i].is_premium){
      tempArray[tempArray.length-1] = '\033[33m'+tempArray[tempArray.length-1]+'\033[39m';
    }
  };
  tempArray.sort();
  for(let i=0; i<tempArray.length; i++){
    console.log(tempArray[i]);
  };
}