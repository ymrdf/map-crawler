
const axios = require('axios');


// const url = "https://map.baidu.com/?newmap=1&qt=cen&b=13506000,3619000;13511000,3623000&l=16&dtype=1&auth=cdcR2TMZ1D8DvYIwx7K7UOANY0Hcccw9uxNExHBHNRVt7YSD5GMEEADzdw8E62qvAuxz6ZwWvvkGcuVtvvhguVtvyheuVtvCMGuVtvCQMuVtvIPcuVtvYvjuVtvZgMuVtv%40vcuVtvc3CuVtvcPPuVtveGvuVtveh3uxtwiKDv7uvhgMuxVVtvrMhuVtGccZcuxtf0wd0vyOFyICIOS7&seckey=SiaFHVFRR%2FZJxz9O%2B%2BcblaD0pjcUGzjwlwFOX3CsRQRePt3evV%2BnWVsxWErolRZj7biyNNKzEu3ddqsoLg0Kjg%3D%3D%2CSiaFHVFRR_ZJxz9O--cblaD0pjcUGzjwlwFOX3CsRQRpDcOFFZBWuJvYxGT_twadhJeweQ-LXpcXG4LXV2wctDjBlhcMCZ0asRas_0kM6mGnuEQ2pVw-3Bah_hLpBruuifb5pRls9kvnDi5HcCY0uYmzjp6_hR_lrkfNBTo7qvmMJmAffbs9SipT-lNGYWczPcZjydoKC6krV09MX5JwLA&pcevaname=pc4.1&newfrom=zhuzhan_webmap&callback=jsonp70590892";
const url = "https://map.baidu.com/?uid=de418f280fa4936ce507380d&ugc_type=3&ugc_ver=1&qt=detailConInfo&device_ratio=2&compat=1&t=1741536048538&auth=cdcR2TMZ1D8DvYIwx7K7UOANY0Hcccw9uxNExHBLVBVtUWQBOEKDDyUxDEXcC%40BvkGcuVtcvY1SGpuEtzzljyYxvyheuVtvCMGuVtvCQMuVtvIPcuxtw8wkv7uvZgMuVtv%40vcuVtvc3CuVtvcPPuVtveGvuxHtIswVH32wiKDv7uvhgMuzVVtvrMhuxRtTttnt3MJf0wd0vyOFyICIOS7&seckey=SiaFHVFRR%2FZJxz9O%2B%2BcblaD0pjcUGzjwlwFOX3CsRQRePt3evV%2BnWVsxWErolRZj7biyNNKzEu3ddqsoLg0Kjg%3D%3D%2CSiaFHVFRR_ZJxz9O--cblaD0pjcUGzjwlwFOX3CsRQRpDcOFFZBWuJvYxGT_twadhJeweQ-LXpcXG4LXV2wctDjBlhcMCZ0asRas_0kM6mGnuEQ2pVw-3Bah_hLpBruuifb5pRls9kvnDi5HcCY0uYmzjp6_hR_lrkfNBTo7qvmMJmAffbs9SipT-lNGYWczPcZjydoKC6krV09MX5JwLA&pcevaname=pc4.1&newfrom=zhuzhan_webmap";

(async function main() {
  // const baiduApiKey = "dgjomzpQeQlYAeRLuwtHFf8wyrwF1QGV"; // 我的
  const baiduApiKey = "KWSoddWr4bd1CXh1gLe4GfmIuPKXuDO9" // GOOD
  // const baiduApiKey = "NQ4u00oIVst9I6sCYhMI9Tql3ssfF3rk" // GOOD
  // const url = `https://api.map.baidu.com/place/v2/detail?uid=a289db3721a0345532f71d42&output=json&scope=2&ak=${baiduApiKey}&photo_show=true`
  const response = await axios.get(url);
  console.log('------',response.data.content.ext.detail_info)


})();
