const fs = require('fs');
const axios = require('axios');
const path = require("path");
const querystring = require('querystring');
const logDir = path.join(__dirname);
const listFile = path.join(logDir, "fetchCountyList.json");

function readJsonFilesFromDirectory(directoryPath) {
  const jsonObjects =[];
  
  try {
      const files = fs.readdirSync(directoryPath);
      
      files.forEach(file => {
          const filePath = path.join(directoryPath, file);
          
          if (path.extname(file) === '.json') {
              const fileContent = fs.readFileSync(filePath, 'utf8');
              try {
                  const res = JSON.parse(fileContent);
                  jsonObjects.push(res)
              } catch (parseError) {
                  console.error(`Error parsing JSON file: ${filePath}`, parseError);
              }
          }
      });
  } catch (error) {
      console.error(`Error reading directory: ${directoryPath}`, error);
  }
  
  return jsonObjects;
}

// 示例用法
const jsonDir = './city'; // 替换为你的文件夹路径
const allJsonData = readJsonFilesFromDirectory(jsonDir);


const mapList = []

allJsonData.forEach((provice) =>{
  provice.districts.forEach(city =>{
    const name = provice.name+city.name
    const list = []
    city.districts.forEach(county =>{
      list.push(county.name)
      // mapList.push(provice.name+city.name+county.name)
    })
    mapList.push({name,list})
    // mapList.push(provice.name+city.name)
  })
})

fs.writeFileSync(listFile, JSON.stringify(mapList, null, 2), "utf-8");

