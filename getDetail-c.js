
const axios = require('axios');
const path = require("path")
const fs = require("fs");

const mapList = require('./fetchCityList.json');

const logDir = path.join(__dirname, "download-log");
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
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

  for(let i = 0; i < 1;i++){
    const city = mapList[i];
    const dataList = require('./data/'+city+'.json');
    // const dataList = [];
    const obList = dataList.length<10?dataList.length:10
    for(let x=0; x<obList;x++){
      try{
        const item = dataList[x]
        const uid = item.uid // GOOD
        const url = `https://ugcapi.baidu.com/richindex/2/photo?uid=${uid}&from=map_pc&pcevaname=pc4.1&pageCount=20&t=1741536555124&auth=cdcR2TMZ1D8DvYIwx7K7UOANY0Hcccw9uxNExHBLBxHtSUOyMCIAAvyyuF2ZfEb1vkGcuVtvvhguVtvyheuVtvCMGuVtvCQMuVtvIPcuxtw8wkv7uvZgMuVtv%40vcuVtvc3CuVtvcPPuVtveGvuxTtLwAYK43wiKDv7uvhgMuzVVtvrMhuzztHee%40ewzvdw8E62qvA7uegvcguxNExHBHNRV&seckey=SiaFHVFRR%2FZJxz9O%2B%2BcblaD0pjcUGzjwlwFOX3CsRQRePt3evV%2BnWVsxWErolRZj7biyNNKzEu3ddqsoLg0Kjg%3D%3D%2CSiaFHVFRR_ZJxz9O--cblaD0pjcUGzjwlwFOX3CsRQRpDcOFFZBWuJvYxGT_twadhJeweQ-LXpcXG4LXV2wctDjBlhcMCZ0asRas_0kM6mGnuEQ2pVw-3Bah_hLpBruuifb5pRls9kvnDi5HcCY0uYmzjp6_hR_lrkfNBTo7qvmMJmAffbs9SipT-lNGYWczPcZjydoKC6krV09MX5JwLA&newfrom=zhuzhan_webmap&callback=jsonp77054501`;
        const response = await axios.get(url);
        // console.log('------',response.data)
    
        const detail = extractJsonpData(response.data);
        if(detail.errno === 0){
    
          const coverUrl = detail.data.image
          const aaa = {...detail.data}
          Reflect.deleteProperty(aaa, 'photo_list')
          console.log("detail----->",aaa)
    
          const dir = path.join(__dirname, "./images", item.uid)
    
          await downloadImage(coverUrl,dir,`cover${path.extname(coverUrl)||".jpg"}`)
    
    
          // console.log("list---->",detail.data.photo_list)
          const len = detail.data.photo_list.length;
          const num = len<6?len:6;
          for(let j=0; j < num; j++){
    
            const pic = detail.data.photo_list[j];
    
            await downloadImage(pic.imgUrl,dir, `${j}${path.extname(pic.imgUrl)||".jpg"}`)
    
          }
        }else{
          logStream.write(`Request: ${detail.toString()}\n\n`);
        }
      }catch(e){
        logStream.write(`Error: ${e.message}\n\n`);
      }
      
    }
  }

  logStream.end(() => {
    console.log(`Log written to ${logFilePath}`);
  });
})();
