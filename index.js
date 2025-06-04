const fs = require('fs');
const axios = require('axios');
const querystring = require('querystring');

class BaiDuPOI {
    constructor(itemy, loc, apiKey) {
        this.itemy = itemy;
        this.loc = loc;
        this.apiKey = apiKey;
    }

    urls() {
        const urls = [];
        for (let pages = 0; pages < 1; pages++) {
            const queryParams = querystring.stringify({
                query: this.itemy,
                bounds: this.loc,
                page_size: 20,
                page_num: pages,
                output: 'json',
                ak: this.apiKey
            });
            // &tag=银行
            // const url = `http://api.map.baidu.com/place/v2/search?${queryParams}`;
            const url = 'https://api.map.baidu.com/place/v2/search?query=少儿英语&region=上海市松江区&output=json&ak=dgjomzpQeQlYAeRLuwtHFf8wyrwF1QGV'
            urls.push(url);
        }
        return urls;
    }

    async baiduSearch() {
        const jsonSel = [];
        for (const url of this.urls()) {
            try {
                console.log("Requesting URL:", url);
                const response = await axios.get(url);
                const data = response.data;
                console.log("Response Data:", data);
                
                if (data.status !== 0 || !data.results || data.results.length === 0) {
                    break;
                }

                for (const item of data.results) {
                    const jname = item.name;
                    const jlat = item.location.lat;
                    const jlng = item.location.lng;
                    jsonSel.push(`${jname},${jlat},${jlng}`);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        return jsonSel;
    }
}

class LocaDiv {
    constructor(locAll) {
        this.locAll = locAll;
    }

    latAll() {
        const [latSw, , latNe] = this.locAll.split(',').map(parseFloat);
        const latList = [];
        for (let i = 0; i <= Math.floor((latNe - latSw) / 0.1); i++) {
            latList.push(latSw + 0.1 * i);
        }
        latList.push(latNe);
        return latList;
    }

    lngAll() {
        const [, lngSw, , lngNe] = this.locAll.split(',').map(parseFloat);
        const lngList = [];
        for (let i = 0; i <= Math.floor((lngNe - lngSw) / 0.1); i++) {
            lngList.push(lngSw + 0.1 * i);
        }
        lngList.push(lngNe);
        return lngList;
    }

    lsRow() {
        const latList = this.latAll();
        const lngList = this.lngAll();
        const ls = [];
        for (let n = 0; n < latList.length - 1; n++) {
            for (let i = 0; i < lngList.length - 1; i++) {
                const a = `${latList[n]},${lngList[i]}`;
                const b = `${latList[n + 1]},${lngList[i + 1]}`;
                ls.push(`${a},${b}`);
            }
        }
        return ls;
    }
}

(async function main() {
    const baiduApiKey = "dgjomzpQeQlYAeRLuwtHFf8wyrwF1QGV";
    console.log("Starting data retrieval...");
    const startTime = Date.now();

    const loc = new LocaDiv('26.200572,106.128061,27.33595,107.282491');
    const locsToUse = loc.lsRow();

    for (const locToUse of locsToUse) {
        const poi = new BaiDuPOI('购物', locToUse, baiduApiKey);
        const results = await poi.baiduSearch();
        console.log("Results:", results);
        fs.writeFileSync('zhengfujigou.csv', results.join('\n'), 'utf8');
    }

    const endTime = Date.now();
    console.log(`Data retrieval complete. Time taken: ${(endTime - startTime) / 1000} seconds.`);
})();
