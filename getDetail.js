
const axios = require('axios');
const path = require("path")
const fs = require("fs");
const config = require('./config.json')

const mapList = require('./fetchCityList.json');
const logDir = path.join(__dirname, 'output/'+config.domain+"/detail-log");
const fileDir = path.join(__dirname, 'output/'+config.domain+"/detail");

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

if (!fs.existsSync(fileDir)) {
  fs.mkdirSync(fileDir);
}

const logFileName = `${new Date().toISOString().replace(/[:.]/g, "-")}.log`;
const logFilePath = path.join(logDir, logFileName);

const logStream = fs.createWriteStream(logFilePath, { flags: "a" });

function extractJsonpData(jsonpString) {
  // 找到第一个 '(' 和最后一个 ')' 的位置
  const startIndex = jsonpString.indexOf('(');
  const endIndex = jsonpString.lastIndexOf(')');

  // 提取括号内的内容
  const jsonString = jsonpString.slice(startIndex + 1, endIndex);

  // 将字符串解析为JSON对象
  const jsonData = JSON.parse(jsonString);

  return jsonData;
}

async function downloadImage(url, dir, filename) {
  const response = await axios({
    url,
    method: "GET",
    responseType: "stream",
  });

  // 确保目录存在
  fs.mkdirSync(dir, { recursive: true });

  const filePath = path.join(dir, filename);
  const writer = fs.createWriteStream(filePath);
  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on("finish", resolve);
    writer.on("error", reject);
  });
}



;(async function main() {

  for(let i = 0; i < mapList.length;i++){
    const city = mapList[i];
    try{


    const dataList = require('./output/'+config.domain+'/data-unique/'+city+'.json');
    const obList = dataList
    const result = [];
    for(let x=0; x<obList.length;x++){
      try{
        const item = dataList[x]
        const uid = item.uid // GOOD
        const url = `https://ugcapi.baidu.com/richindex/2/photo?uid=${uid}&from=map_pc&pcevaname=pc4.1&pageCount=20&t=1741536555124&auth=cdcR2TMZ1D8DvYIwx7K7UOANY0Hcccw9uxNExHBLBxHtSUOyMCIAAvyyuF2ZfEb1vkGcuVtvvhguVtvyheuVtvCMGuVtvCQMuVtvIPcuxtw8wkv7uvZgMuVtv%40vcuVtvc3CuVtvcPPuVtveGvuxTtLwAYK43wiKDv7uvhgMuzVVtvrMhuzztHee%40ewzvdw8E62qvA7uegvcguxNExHBHNRV&seckey=SiaFHVFRR%2FZJxz9O%2B%2BcblaD0pjcUGzjwlwFOX3CsRQRePt3evV%2BnWVsxWErolRZj7biyNNKzEu3ddqsoLg0Kjg%3D%3D%2CSiaFHVFRR_ZJxz9O--cblaD0pjcUGzjwlwFOX3CsRQRpDcOFFZBWuJvYxGT_twadhJeweQ-LXpcXG4LXV2wctDjBlhcMCZ0asRas_0kM6mGnuEQ2pVw-3Bah_hLpBruuifb5pRls9kvnDi5HcCY0uYmzjp6_hR_lrkfNBTo7qvmMJmAffbs9SipT-lNGYWczPcZjydoKC6krV09MX5JwLA&newfrom=zhuzhan_webmap&callback=jsonp77054501`;
        const response = await axios.get(url);
    
        const detail = extractJsonpData(response.data);
        if(detail.errno === 0){
    
          const coverUrl = detail.data.image
          const len = detail.data.photo_list;
          const picLi = len<6?detail.data.photo_list:detail.data.photo_list.slice(0,6)



          result.push({
            ...item,
            cover: coverUrl,
            photo_list: picLi.map(item => item.imgUrl)
          })

        }else{
          logStream.write(`Request: ${detail.toString()}\n\n`);
        }
      }catch(e){
        logStream.write(`Error: ${e.message}\n\n`);
      }
      
    }

    const listFile = path.join(fileDir, city + ".json");

    fs.writeFileSync(listFile, JSON.stringify(result, null, 2), "utf-8");
  }catch(e){
    console.log(`Log written to ${logFilePath}`);
  }
  }

  logStream.end(() => {
    console.log(`Log written to ${logFilePath}`);
  });
})();
