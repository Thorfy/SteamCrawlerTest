const SteamUser = require('steam-user');
const request = require('request');
const moment = require('moment');

const Item = require('../classes/item.js');
const config = require('../config.js');
const Database = require('../classes/db.js');

let db = new Database();
let client = new SteamUser();

client.logOn({
	"accountName": config.steamLogin,
	"password": config.steamPassWord
});

client.on('loggedOn', function(details, parental) {
	console.log('Client : loggedOn !')

});

client.on('webSession', function(sessionID, cookies) {
    addInDB(cookies)
    console.log("Client : Got web session");
});

function addInDB(cookies){
    //console.log(sessionID)
    //console.log(cookies)
    let dateDuJour = moment(new Date()).format('L');
    console.log(dateDuJour)
    db.query('SELECT * FROM `item` WHERE `dateMaj` != ' + dateDuJour + ' LIMIT 1').then(async function(items) {
        if(items.length >= 1){
            let item = items[0];            
            let res = await Item.getItemHistory(item.id_item, item.market_hash_name, cookies)
            if (res.success === true) {
                let deleteDB = await db.query('DELETE FROM `history` WHERE id_item = '+item.id_item);
                for (var f = 0, priceLen = res.prices.length; f < priceLen; f++) {
                    if (res.prices[f]) {
                        let arrayData = res.prices[f];
                        let sqlInput = `INSERT INTO \`history\` (id_item, date, price, volume) VALUES (${item.id_item}, '${arrayData[0]}', ${parseFloat(arrayData[1])}, '${arrayData[2]}');`;
                        let resDB = await db.query(sqlInput);
                        let updateDate = await db.query("UPDATE `item` SET dateMaj = '"+dateDuJour+"' WHERE id_item = " + item.id_item);
                    }
                }
            }
        }
    });
}


