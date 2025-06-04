const axios = require('axios');
const path = require("path")
const fs = require("fs");
const config = require('./config.json')

const fileDir = path.join(__dirname, 'output/'+config.domain+"/data-unique");

const mapList = require('./fetchCityList.json');

const logDir = path.join(__dirname, 'output/'+config.domain+"/unique-log");
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// 创建 log 目录
if (!fs.existsSync(fileDir)) {
  fs.mkdirSync(fileDir);
}


function uniqueByArea(data,city) {
  const map = new Map();
  return data.filter(item => {
    let realCity = item.city
    if(city.startsWith('上海')||city.startsWith('天津')||city.startsWith("北京")||city.startsWith("重庆")){
      realCity = item.area;
    }
    if(city.indexOf(realCity)<0){
      return false
    }
    if (!map.has(item.area)) {
      map.set(item.area, true);
      return true;
    }
    return false;
  });
}






const logFileName = `${new Date().toISOString().replace(/[:.]/g, "-")}.log`;
const logFilePath = path.join(logDir, logFileName);

const logStream = fs.createWriteStream(logFilePath, { flags: "a" });

;(async function main() {

  for(let i = 0; i < mapList.length;i++){
    try{
      const city = mapList[i];
      const dataList = require('./output/'+config.domain+'/data/'+city+'.json');
      // const dataList = [];
      // const obList = uniqueByArea(dataList, city);
      // obList = dataList.filter(item => item.name.indexOf("救援")>=0)
      const obList = dataList;
  
      const listFile = path.join(fileDir, city + ".json");
  
      fs.writeFileSync(listFile, JSON.stringify(obList, null, 2), "utf-8");
    }catch(e){
      logStream.write(`Error: ${e.message}\n\n`)
    }
  }

  logStream.end(() => {
    console.log(`Log written to ${logFilePath}`);
  });
})();
