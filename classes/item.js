const request = require('request');

class Item {
    static getAllItems() {
        return new Promise((resolve, reject) => {
            request({
                uri: 'http://api.csgo.steamlytics.xyz/v1/items?key=2c802e25b5bf0bb8e560baec5011c03d',
                method: 'GET'
            }, function(err, res, body) {
                if (err) {
                    return reject(err);
                }
                return resolve(JSON.parse(body));
            });
        });
    }
    static getItemHistory(id_item, market_hash_name, cookies) {
        return new Promise((resolve, reject) => {
            console.log(id_item + ' - ' + market_hash_name + ' - requested')
            request({
                headers: {
                    'Host': 'steamcommunity.com',
                    'Connection': 'keep-alive',
                    'Cache-Control': 'max-age=0',
                    'Upgrade-Insecure-Requests': 1,
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.81 Safari/537.36',
                    'Accept': 'application/json',
                    'Cookie': cookies.join(';')
                },
                uri: "https://steamcommunity.com/market/pricehistory/?country=US&currency=1&appid=730&market_hash_name=" + encodeURIComponent(market_hash_name),
                body: '',
                method: 'GET'
            }, function(err, res, body) {
                if (err) {
                    console.log('ERROR: getItemHistory -> callback err')
                    reject(err);
                }
                try {
                    console.log(body)
                    console.log('Try decode Item')
                    let jsonbody = JSON.parse(body)
                    resolve(jsonbody)
                } catch (e) {
                    console.log('ERROR: getItemHistory -> success false')
                    resolve("{'success':false, 'message':'We can\'t retrieve date for " + encodeURIComponent(market_hash_name) + "}")
                }

            });
        });
    }
}

module.exports = Item;
