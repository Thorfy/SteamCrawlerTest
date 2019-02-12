const request = require( 'request' );

class Item {
    static getAllItems() {
        return new Promise(( resolve, reject ) => {
            request({
                uri: 'http://api.csgo.steamlytics.xyz/v1/items?key=2c802e25b5bf0bb8e560baec5011c03d',
                method: 'GET'
            }, function (err, res, body) {
                if(err){
                    return reject(err);
                }
                return resolve(JSON.parse(body));
            }); 
        });
    }
    static getItemHistory(market_hash_name, cookies) {
        return new Promise(( resolve, reject ) => {
           request({
            headers:{
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
        }, function (err, res, body) {
            if(err){
                return reject(err);
            }
            try{
                let jsonbody = JSON.parse(body)
                resolve(jsonbody)
            }catch(e){
                resolve("{'success':false, 'message':'We can't retrieve date for "+encodeURIComponent(market_hash_name)+"}")
            }
            
        }); 
       });
    }
}

module.exports = Item;