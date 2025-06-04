
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

const url = "http://www.jindouyunapp.com/index.php?s=/addon/Duoguan_booking/Service/editServiceInfo.html"

const headers = {
  "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
  Cookie:
    "Hm_lvt_353e5b8fe9292ecb5218a56a1a024c10=1741945892,1742194672,1742538964,1743864547; PHPSESSID=dqn8hbpqmn217s263psu3r3ls6; x_duoguan_com_homeScanLoginKey=681abee33855f; x_duoguan_com_homeuser_auth_sign=ab86c1512dfe7184d56d5cf09a9051bc65a8d17c; x_duoguan_com_homeUserauth=think%3A%7B%22sign%22%3A%22b22da227ed9be7ed40849b91ad478725%22%2C%22uid%22%3A%228629718%22%2C%22time%22%3A%221746583300%22%7D; x_duoguan_com_homeapid=205635; SECKEY_ABVK=ALxxMPw1D93y33cLqcjk/xaGwjKSlsN+JhCWl14/Zdo%3D; BMAP_SECKEY=XoJTXgy3uCMWX3KYd1y57lvzkxQC4lQlO98DPY8xrHGfeRqAr8SlFQIkPvpywR82XjI0-3Q9lVGcy5nE7xbN-6JCV1rb10LC70eJ98Wy16XiJ5hAyX-K2TFVsJxUl8LENF4jLWOiKpToxdyc7Urj4xxtaOX8TP3hl9LeGVTuswfn1JBL8I1LsOeVXgAJ0OGa; x_duoguan_com_homeimgtype=1; SERVERID=5ca12440d0ab6a81e9222c6f6c47e2bd|1746607747|1746583266",
  referer: "http://www.jindouyunapp.com/index.php?s=/addon/Duoguan_booking/Service/editServiceInfo.html",
};

// function createFormData(name) {

//   const params = {
//     cate_id: "9585",
//     name: name + "放生",
//     img: "18590832",
//     g_photo: ["18590835","18590834"],
//     video: "",
//     description: `本店提供专业、敬慎的${name}放生服务，帮助您积福行善、祈愿顺遂。放生${name}，不仅寓意放生得福、广结善缘，更可寄托对家人、事业、健康的美好祝愿。
    
//     我们的${name}放生流程规范、安全，并选用健康活力的${name}鱼种，由专人前往生态良好的放生水域，进行全程护送与仪式性放生，确保每一条生命都被悉心对待。
    
//     如您有祈愿内容（如求子、求财、健康平安等），我们可在放生时为您恭读祈愿文，助您心愿圆满、福报增长。`,
    
//     content: `<p style="text-align: center;"><span style="font-size: 24px;"><strong>放生服务 · 福运随行</strong></span></p><p style="text-align: center;"><span style="font-size: 24px;"><strong><br/></strong></span></p><p style="text-align: center;">还在为运势不佳、事业受阻、情感不顺而烦恼吗？</p><p style="text-align: center;">试试积福改运的方式——锦鲤放生，为自己或家人种下福田，开启好运人生！</p><p><br/></p><p><br/></p><p style="text-align: center;"><span style="font-size: 24px;"><strong>服务内容：</strong></span></p><p><br/></p><p style="text-align: center;">优选健康锦鲤：精选色泽靓丽、体态活泼的锦鲤，象征富贵吉祥与鸿运当头。</p><p><br/></p><p style="text-align: center;">专人专程放生：由专人代为前往天然生态水域进行放生，确保环境适宜、放生有善果。</p><p><br/></p><p style="text-align: center;">代念祈愿文：您可备注祈愿事项（如事业顺利、家庭安康、姻缘圆满等），我们将于放生时恭敬代念，诚心祈福。</p><p><br/></p><p style="text-align: center;">放生活动记录：提供真实放生照片或视频，让您感受到心愿播种的仪式感与庄重性。</p><p><br/></p><p><br/></p><p style="text-align: center;"><span style="font-size: 24px;"><strong>适合人群：</strong></span></p><p style="text-align: center;"><span style="font-size: 24px;"><strong><br/></strong></span></p><p style="text-align: center;"><span style="font-size: 24px;"><strong><br/></strong></span></p><p style="text-align: center;">渴望转运、增福、祈愿达成者</p><p><br/></p><p style="text-align: center;">为家人积德祈福的孝子贤孙</p><p><br/></p><p style="text-align: center;">想通过善行安抚内心、积累功德者</p><p><br/></p><p><br/></p><p><br/></p><p style="text-align: center;"><span style="font-size: 24px;"><strong>关于我们:</strong></span></p><p style="text-align: center;"><span style="font-size: 24px;"><strong><br/></strong></span></p><p style="text-align: center;"><span style="font-size: 24px;"><strong><br/></strong></span></p><p><br/></p><p style="text-align: center;">每日放生 风雨无阻 全球登记</p><p><br/></p><p style="text-align: center;">上午十点 从不间断 参与放生 不限随喜</p><p><br/></p><p style="text-align: center;">代放生鲫鱼 鲤鱼 甲鱼 泥鳅 黑鱼 黄鳝 螺狮</p><p><br/></p><p style="text-align: center;">放生结束发送放生视频 如亲临现场</p><p><br/></p><p style="text-align: center;">（遵守国家法律法规 合理合法增殖放流）</p><p><br/></p><p style="text-align: center;">【自然水域放生 水质优良 国家禁捕 科学放生】</p><p><br/></p><p style="text-align: center;">想放生但没时间或条件不允许 可以联系代放</p><p><br/></p><p style="text-align: center;">真诚的希望我能帮助到您 每日放生 不限随喜</p><p><br/></p><p style="text-align: center;">当您打开此网页 你我相识即开始</p><p><br/></p><p style="text-align: center;">从2022年至今已坚持放生3年 已为超过一万人</p><p style="text-align: center;">做了放生回向</p><p style="text-align: center;">累计放生鱼苗等各类物命超过百万斤</p><p style="text-align: center;">每日放生 风雨无阻</p><p style="text-align: center;">放生全程录制视频 给您发送 请您放心参与</p><p style="text-align: center;">您可以在线自由下单放生</p><p><br/></p><p style="text-align: center;">福从善来，愿由心生。一份放生善举，可能就是改变命运的转折点。</p><p style="text-align: center;">现在下单，让好运如锦鲤跃龙门，一跃而上，直通心愿彼岸！<br/><br/></p><p style="text-align: center;"><img src="http://xrs.tupiancunchu.com/Picture/212d273306522d14/Duoguan_booking/2025-05-07/baidu_editor/1746604565000210.png"/></p><p style="text-align: center;"><img src="http://xrs.tupiancunchu.com/Picture/212d273306522d14/Duoguan_booking/2025-05-07/baidu_editor/1746604565000515.png"/></p><p style="text-align: center;"><img src="http://xrs.tupiancunchu.com/Picture/212d273306522d14/Duoguan_booking/2025-05-07/baidu_editor/1746604565000616.png"/></p><p style="text-align: center;"><img src="http://xrs.tupiancunchu.com/Picture/212d273306522d14/Duoguan_booking/2025-05-07/baidu_editor/174660456500083.png"/></p><p style="text-align: center;"><img src="http://xrs.tupiancunchu.com/Picture/212d273306522d14/Duoguan_booking/2025-05-07/baidu_editor/1746604565000914.png"/></p><p><br/></p>`,
//     parse: 0,
//     mor_start_time: "",
//     mor_end_time: "",
//     aft_start_time: "",
//     aft_end_time: "",
//     rest_time_ids: "",
//     advance: 10,
//     reseve_time_interval: 0,
//     time_style: 1,
//     is_more_choose: 1,
//     per_add_pay: 0.00,
//     reseve_num_limit: 0,
//     one_limit: 0,
//     time_number: 0,
//     yuyue_type: 2,
//     m_tail_type: 0,
//     m_tail_price: "",
//     price: "",
//     d_tail_type: 0,
//     d_tail_price: "",
//     full_price: 166,
//     is_sale: 1,
//     service_type: 3,
//     service_type_name: "",
//     s_number: 29227,
//     sale_number: 4143,
//     show_score: 5.0,
//     sort: 5,
//     propertydata: `[{"name":"小号","item":[{"name":"10斤","price":"100"},{"name":"20斤","price":"200"},{"name":"30斤","price":"300"},{"name":"40斤","price":"400"},{"name":"50斤","price":"500"},{"name":"60斤","price":"600"},{"name":"70斤","price":"700"},{"name":"80斤","price":"800"}]},{"name":"中号","item":[{"name":"10斤","price":"150"},{"name":"20斤","price":"200"},{"name":"30斤","price":"300"},{"name":"40斤","price":"400"},{"name":"50斤","price":"500"},{"name":"60斤","price":"600"},{"name":"70斤","price":"700"},{"name":"80斤","price":"800"}]},{"name":"大号","item":[{"name":"10斤","price":"200"},{"name":"20斤","price":"200"},{"name":"30斤","price":"300"},{"name":"40斤","price":"400"},{"name":"50斤","price":"500"},{"name":"60斤","price":"600"},{"name":"70斤","price":"700"},{"name":"80斤","price":"800"}]}]`
// };
//   const form = new FormData();
  
//   for (const key in params) {
//       if (Array.isArray(params[key])) {
//           params[key].forEach(value => form.append(`${key}[]`, value));
//       } else {
//           form.append(key, params[key]);
//       }
//   }
  
//   return form;
// }



// const logStream = fs.createWriteStream(logFilePath, { flags: "a" });




// ;(async function main() {
//     const dataList = ["鲤鱼","鲫鱼","黑鱼","甲鱼","泥鳅","黄鳝","河蚌","螃蟹",'小鸟']
//     for(let x=0; x<dataList.length;x++){
//       const item = dataList[x]
//       try{
//         const form = createFormData(item)
//         const response = await axios.post(url, form, { headers });
//         await delay(3000)
//         console.log(response)
//       }catch(e){
//         logStream.write(`Error: ${e.message}\n\n`);
//       }
//   }

//   logStream.end(() => {
//     console.log(`Log written to ${logFilePath}`);
//   });
// })();

;(async function main() {
  for(let i = 21946; i < 21974;i++){
    try{
      console.log(i)
      const response = await axios.get(`http://www.jindouyunapp.com/index.php?s=/addon/Duoguan_booking/Service/del/id/${i}.html`, { headers });
    }catch(e){
      console.log(e)
      // logStream.write(`Error: ${e.message}\n\n`);
    }
  }
})();