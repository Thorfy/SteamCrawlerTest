const request = require( 'request' );

class Item {
    static getAllItems() {
        return new Promise(( resolve, reject ) => {
            request({
                uri: 'http://api.csgo.steamlytics.xyz/v1/items?key=2c802e25b5bf0bb8e560baec5011c03d',
                method: 'GET'
            }, function (err, res, body) {
                if(err){
                    reject(err);
                }
                resolve(JSON.parse(body));
            }); 
        });
    }
}

module.exports = Item;