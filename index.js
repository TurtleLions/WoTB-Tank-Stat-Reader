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
  printFromArrayInObject(tankA, 'usa');
  printFromArrayInObject(tankA, 'uk');
  printFromArrayInObject(tankA, 'germany');
  printFromArrayInObject(tankA, 'ussr');
  printFromArrayInObject(tankA, 'france');
  printFromArrayInObject(tankA, 'japan');
  printFromArrayInObject(tankA, 'china');
  printFromArrayInObject(tankA, 'european');
  printFromArrayInObject(tankA, 'other');
  /**console.log('\nAmerican');
  for(let i = 0; i<tankA.usa.length; i++){
    console.log(tankA.usa[i].name);
  };
  console.log('\nBritish');
  for(let i = 0; i<tankA.uk.length; i++){
    console.log(tankA.uk[i].name);
  };
  console.log('\nGerman');
  for(let i = 0; i<tankA.germany.length; i++){
    console.log(tankA.germany[i].name);
  };
  console.log('\nSoviet');
  for(let i = 0; i<tankA.ussr.length; i++){
    console.log(tankA.ussr[i].name);
  };
  console.log('\nFrench');
  for(let i = 0; i<tankA.france.length; i++){
    console.log(tankA.france[i].name);
  };
  console.log('\nJapanese');
  for(let i = 0; i<tankA.japan.length; i++){
    console.log(tankA.japan[i].name);
  };
  console.log('\nChinese');
  for(let i = 0; i<tankA.china.length; i++){
    console.log(tankA.china[i].name);
  };
  console.log('\nEuropean');
  for(let i = 0; i<tankA.european.length; i++){
    console.log(tankA.european[i].name);
  };
  console.log('\nHybrid');
  for(let i = 0; i<tankA.other.length; i++){
    console.log(tankA.other[i].name);
  };**/
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
  for(let i=0; i<objectName.giveArrayName.length; i++){
    console.log(objectName.giveArrayName[i].name);
  };
}