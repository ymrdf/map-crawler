
const fs = require('fs');
const axios = require('axios');
const path = require("path");
const querystring = require('querystring');
const logDir = path.join(__dirname, "city");
// const listFold = path.join(logDir, "list0.json");
const errorFile = path.join(logDir, "error.log");

// 创建 log 目录
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const mapList = [
"北京",
"天津",
"上海",
"重庆",
"河北",
"山西",
"辽宁",
"吉林",
"黑龙江",
"江苏",
"浙江",
"安徽",
"福建",
"江西",
"山东",
"河南",
"湖北",
"湖南",
"广东",
"海南",
"四川",
"贵州",
"云南",
"陕西",
"甘肃",
"青海",
"广西",
"内蒙古",
// "西藏",
"宁夏",
"新疆"
]

const query = "少儿英语"


async function baiduSearch() {
  const jsonSel = [];
  for (const add of mapList) {
      try {
        const url = `https://api.map.baidu.com/api_region_search/v1/?keyword=${add}&sub_admin=2&ak=dgjomzpQeQlYAeRLuwtHFf8wyrwF1QGV`;
          console.log("Requesting URL:", url);
          const response = await axios.get(url);
          const data = response.data;
          const aaa = data.districts[0]
          console.log("Response Data:", aaa);
          const listFile = path.join(logDir, add + ".json");
          fs.writeFileSync(listFile, JSON.stringify(aaa, null, 2), "utf-8");

      } catch (error) {
          console.error("Error fetching data:", error);
      }
  }
}

baiduSearch();
