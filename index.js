const SteamUser = require('steam-user');
const request = require('request');
const moment = require('moment');

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

 client.on('loggedOn', function(details, parental){
 	console.log('Client : loggedOn !')    

 });

 client.on('webSession', function(sessionID, cookies) {
 	console.log("Client : Got web session");
	//console.log(sessionID)
	console.log(cookies)

	db.query('SELECT * FROM `item`').then(function(items){
		asyncForEach(items, async (item) => {

			await sleep(2000);
			console.log(item.market_hash_name +' - requested'y)
			let res = await Item.getItemHistory(item.market_hash_name, cookies);
			
			if(res.success === true){
				let bigInsert = "";
				res.prices.forEach(async function(arrayData) {
					let sqlInput = `INSERT INTO \`history\` (id_item, date, price, volume) VALUES (${item.id_item}, '${arrayData[0]}', ${parseFloat(arrayData[1])}, '${arrayData[2]}');`;					
					let resDB = await db.query(sqlInput);	
					//console.log(`${await resDB}`);
				});
				console.log(`${item.market_hash_name} added in db`);
			}else{
				console.log(res);
			}

		})
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