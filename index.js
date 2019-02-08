const SteamUser = require('steam-user');
const request = require('request');
const Item = require('./classes/item.js');
const Database = require('./classes/db.js');

let db = new Database();

 //REFRESH ALL DB ITEM
/*Item.getAllItems().then(res => { 
	if(res.success === true){
		res.items.forEach(function(obj) {
			try {
  				sqlrequest = `INSERT INTO item (market_name, market_hash_name, border_color, image) VALUES ("${obj.market_name}", "${obj.market_hash_name}", "${obj.name_color}", "https:${obj.icon_url}");`;
  				db.query(sqlrequest).then( result => console.log(result));
			}catch(error){
  				console.error(error);
			}
		});
		
	}else{
		console.log(res.message);
	}
});*/


let client = new SteamUser();
client.logOn({	
	"accountName": "thorfy3",
	"password": "Xki0133e"
});

//db.query('SELECT * FROM `item`').then(response => console.log(response));

/*client.on('loggedOn', function(details, parental){
	console.log('Client : loggedOn !')    

});*/

client.on('webSession', function(sessionID, cookies) {
	console.log("Client : Got web session");
	//console.log(sessionID)
	//console.log(cookies)

	db.query('SELECT * FROM `item`').then(function(items){
		let itemsArray = JSON.parse(JSON.stringify(items));
		itemsArray.forEach(function(item){
			if(item.market_hash_name){
				try{
					Item.getItemHistory(item.market_hash_name, cookies).then(res => { 
						if(res.success === true){
							let sqlrequest = "";
							res.prices.forEach(function(arrayData) {
								sqlrequest += `INSERT INTO history (id_item, date, price, volume) VALUES (${item.id_item}, "${arrayData[0]}", "${arrayData[1]}", "${arrayData[2]}");`;
							});
							try{
								db.query(sqlrequest).then( result => console.log(`${item.market_hash_name} added in db`));
							}catch(e){
								console.log(e)
							}
						}else{
							console.log(res.message);
						}
					});
				}catch(e){
					console.log(e);
				}
			}
		})
	});

});


