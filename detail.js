
const axios = require('axios');



(async function main() {
  // const baiduApiKey = "dgjomzpQeQlYAeRLuwtHFf8wyrwF1QGV"; // 我的
  const baiduApiKey = "KWSoddWr4bd1CXh1gLe4GfmIuPKXuDO9" // GOOD
  // const baiduApiKey = "NQ4u00oIVst9I6sCYhMI9Tql3ssfF3rk" // GOOD
  const url = `https://api.map.baidu.com/place/v2/detail?uid=a289db3721a0345532f71d42&output=json&scope=2&ak=${baiduApiKey}&photo_show=true`
  const response = await axios.get(url);
  console.log('------',response.data)


})();