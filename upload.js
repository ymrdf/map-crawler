
const axios = require('axios');
const path = require("path")
const fs = require("fs");
const mapList = require('./fetchCityList.json');
const { delay } = require("./utils");

const logDir = path.join(__dirname, "detail-log");

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const logFileName = `${new Date().toISOString().replace(/[:.]/g, "-")}.log`;
const logFilePath = path.join(logDir, logFileName);

const url = "http://www.jindouyunapp.com/index.php?s=/addon/Duoguan_tel/Article/edit.html"

const headers = {
  "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
  Cookie:
    "Hm_lvt_353e5b8fe9292ecb5218a56a1a024c10=1738678690,1740734528; PHPSESSID=u3diqrm3p4fe37e35s8njn7nh2; x_duoguan_com_homeScanLoginKey=67cf001dec011; x_duoguan_com_homeuser_auth_sign=a4d51fdfd87d57480c780ac037bf43d335c0887c; x_duoguan_com_homeUserauth=think%3A%7B%22sign%22%3A%224fae1c1116a2fb96a1b18b766f3b5c73%22%2C%22uid%22%3A%228629718%22%2C%22time%22%3A%221741619261%22%7D; x_duoguan_com_homeapid=193938; x_duoguan_com_homeimgtype=1; SECKEY_ABVK=YZD60h38mGv6nE6vLB/97S7EfZbH569VKHX6jhAneWBYQPylRyJnNSKG2guPc7DEJC1k2o/QpGBlG4/tcZnJSw%3D%3D; BMAP_SECKEY=YZD60h38mGv6nE6vLB_97S7EfZbH569VKHX6jhAneWC3jZriHxctTAmUErnOQPx36EgeikFBLPo0lRDo3vTHVnHg53S563cS4imAsLoH4xsAULAa3yBsKYWWPqrysjU36PuCQkosfYtZsn0G-OzuPQKPBKNF0bwOoEDt-kwU03YzqrPuSzPcSYaNnMLrUS__HDEvkvIbA5MXvZkqZgHLCQ; SERVERID=22602af6f326a34a006bec462cd11a69|1741621126|1741619229",
  referer: "http://www.jindouyunapp.com/index.php?s=/addon/Duoguan_tel/Article/edit.html",
};

function createFormData(item) {

  let phone = item.telephone
  
  if(item.telephone.indexOf(",")>0){
    const [part1,part2] = phone.split(',')
    if(part2 && part2.startsWith('1')){
      phone = part2
    }

    if(part1 && part1.startsWith('1')){
      phone = part1
    }

  }

  const params = {
    t_name: item.name,
    t_contact_name: "",
    t_contact_phone: phone,
    t_contact_weixin: "",
    t_info: "",
    t_one_cate_id: "71874",
    t_two_cate_id: "",
    t_logo: item.cover,
    t_pay_month: "12",
    title: "",
    t_is_show: "1",
    t_address: item.address,
    gps: item.location.lng +","+ item.location.lat,
    t_lng: "",
    t_lat: "",
    imgs: item.photo_list,
    sort: "999",
    t_pay_amount: ""
};
  const form = new FormData();
  
  for (const key in params) {
      if (Array.isArray(params[key])) {
          params[key].forEach(value => form.append(`${key}[]`, value));
      } else {
          form.append(key, params[key]);
      }
  }
  
  return form;
}



const logStream = fs.createWriteStream(logFilePath, { flags: "a" });




;(async function main() {
  for(let i = 0; i < 5;i++){
    const city = mapList[i];
    const dataList = require('./detail/'+city+'.json');
    const obList = dataList
    for(let x=0; x<obList.length;x++){
      const item = dataList[x]
      try{
        const form = createFormData(item)
        const response = await axios.post(url, form, { headers });
        await delay(3000)
        console.log(response)
      }catch(e){
        logStream.write(`Error: ${e.message}\n\n`);
      }
    }
  }



  logStream.end(() => {
    console.log(`Log written to ${logFilePath}`);
  });
})();