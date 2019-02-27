const SteamUser = require('steam-user');
const request = require('request');
const moment = require('moment');
const _cliProgress = require('cli-progress');
const bar1 = new _cliProgress.Bar({}, _cliProgress.Presets.shades_classic)


const Item = require('./classes/item.js');
const config = require('./config.js');
const Database = require('./classes/db.js');


let db = new Database();

//REFRESH ALL DB ITEM
// Item.getAllItems().then(res => {
// 	if(res.success === true){
// 		res.items.forEach(function(obj) {
// 			try {
// 				sqlrequest = `INSERT INTO item (market_name, market_hash_name, border_color, image) VALUES ("${obj.market_name}", "${obj.market_hash_name}", "${obj.name_color}", "https:${obj.icon_url}");`;
// 				db.query(sqlrequest).then( result => console.log(result));
// 			}catch(error){
// 				console.error(error);
// 			}
// 		});

// 	}else{
// 		console.log(res.message);
// 	}
// });


let client = new SteamUser();

client.logOn({
    "accountName": config.steamLogin,
    "password": config.steamPassWord
});

client.on('loggedOn', function(details, parental) {
    console.log('Client : loggedOn !')

});

client.on('webSession', function(sessionID, cookies) {
    console.log("Client : Got web session");
    //console.log(sessionID)
    //console.log(cookies)
    db.query('SELECT id_item FROM `history` ORDER BY id_item DESC LIMIT 1').then(function(lastItem) {

        console.log(lastItem);
        if (lastItem.length != 0 && lastItem[0].id_item) {
            lastItem = lastItem[0].id_item
        } else {
            lastItem = 0
        }

        db.query('SELECT * FROM `item` WHERE id_item > ' + lastItem).then(async function(items) {

            for (var i = 0, len = items.length; i < len; i++) {
                let item = items[i];
                console.log(item.id_item + ' - ' + item.market_hash_name + ' - requested')

                let res = await Item.getItemHistory(item.market_hash_name, cookies)
                if (res.success === true) {
                    let bigInsert = "";
                    bar1.start(res.prices.length, 0);
                    for (var f = 0, len = res.prices.length; f < len; f++) {
                        if (res.prices[f]) {
                            let arrayData = res.prices[f];
                            let sqlInput = `INSERT INTO \`history\` (id_item, date, price, volume) VALUES (${item.id_item}, '${arrayData[0]}', ${parseFloat(arrayData[1])}, '${arrayData[2]}');`;
                            await db.query(sqlInput);
                            bar1.increment();
                        }
                    }
                    bar1.stop();

                } else {
                    console.log(res.message);
                }
            }
        });

    });

});


async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
