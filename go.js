const fs = require('fs');
const axios = require('axios');
const path = require("path");
const querystring = require('querystring');
const config = require('./config.json')

const logDir = path.join(__dirname, 'output/'+config.domain+"/data");
const mapList = require('./fetchCityList.json');

// 创建 log 目录
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}



const queryList = config.query


async function baiduSearch() {

  for (let i=1; i<mapList.length; i++) {
    const add = mapList[i]
    const jsonSel = [];
    for(let j=0; j<queryList.length;j++){
      const query = queryList[j]
      try {
        const url = `https://api.map.baidu.com/place/v2/search?query=${query}&region=${add}&output=json&ak=dgjomzpQeQlYAeRLuwtHFf8wyrwF1QGV`;
          console.log("Requesting URL:", url);
          const response = await axios.get(url);
          const data = response.data;
          console.log("Response Data:", data);
          
          if (data.status !== 0 || !data.results || data.results.length === 0 || data.result_type !== "poi_type") {
              continue;
          }

          for (const item of data.results) {
              jsonSel.push(item);
          }

      } catch (error) {
          console.error("Error fetching data:", error);
      }
    }

    const listFile = path.join(logDir, add + ".json");

    fs.writeFileSync(listFile, JSON.stringify(jsonSel, null, 2), "utf-8");

  }

  // return jsonSel;
}

baiduSearch();