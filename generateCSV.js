
const axios = require('axios');
const path = require("path")
const fs = require("fs");
const iconv = require('iconv-lite');
const config = require('./config.json')
const mapList = require('./fetchCityList.json');

const logDir = path.join(__dirname, 'output/'+config.domain+"/detail-log");
const fileAddr = path.join(__dirname, 'output/'+config.domain+"/csv/template.CSV");

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const logFileName = `${new Date().toISOString().replace(/[:.]/g, "-")}.log`;
const logFilePath = path.join(logDir, logFileName);

const logStream = fs.createWriteStream(logFilePath, { flags: "a" });

function copyFileAndRename(sourcePath, newFileName) {
  try {
      // 获取源文件所在目录
      const dir = path.dirname(sourcePath);
      // 目标文件的完整路径
      const destinationPath = path.join(dir, newFileName);
      
      // 复制文件
      fs.copyFileSync(sourcePath, destinationPath);
      
      console.log(`文件已复制到: ${destinationPath}`);
      return destinationPath;
  } catch (error) {
      console.error('文件复制失败:', error);
      throw error;
  }
}




;(async function main() {
  const result = []
  const aimFile = copyFileAndRename(fileAddr,'1.csv')
  for(let i = 0; i < mapList.length;i++){      try{

    const city = mapList[i];
    const dataList = require('./output/'+config.domain+'/detail/'+city+'.json');
    const obList = dataList
    for(let x=0; x<obList.length;x++){

        const item = dataList[x]
        const newRow = `${item.name},${item.cover},${item.telephone.replaceAll(',','/')},${item.telephone.replaceAll(',','/')},${" "},6,${item.address},${" "}`
        const gbkBuffer = iconv.encode(newRow, 'gbk');
        fs.appendFileSync(aimFile, gbkBuffer);
        fs.appendFileSync(aimFile, '\n','utf-8');

    }
  }catch(e){
    logStream.write(`Error: ${e.message}\n\n`);
  }
  }



  logStream.end(() => {
    console.log(`Log written to ${logFilePath}`);
  });
})();