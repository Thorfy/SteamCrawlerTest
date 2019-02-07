const SteamUser = require('steam-user');
const request = require('request');
const Item = require('./classes/item.js');
const Database = require('./classes/db.js');

let db = new Database();

/* REFRESH ALL DB ITEM
Item.getAllItems().then(res => { 
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
});
*/

let client = new SteamUser();
client.logOn({	
	"accountName": "",
	"password": ""
});

//db.query('SELECT * FROM `item`').then(response => console.log(response));

/*client.on('loggedOn', function(details, parental){
	console.log('Client : loggedOn !')    

});*/

client.on('webSession', function(sessionID, cookies) {
	console.log("Client : Got web session");
	//console.log(sessionID)
	//console.log(cookies)

	/*request({
			headers:{
				'Host': 'steamcommunity.com',
				'Connection': 'keep-alive',
				'Cache-Control': 'max-age=0',
				'Upgrade-Insecure-Requests': 1,
				'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.81 Safari/537.36',
				'Accept': 'application/json,text/*;q=0.99',
				'Cookie': cookies.join(';')
			}, 
			uri: 'https://steamcommunity.com/market/pricehistory/?country=US&currency=1&appid=730&market_hash_name=Glove%20Case%20Key',
    		body: '',
    		method: 'GET'
  		}, function (err, res, body) {
  			console.log(res)
  		});*/
	//Set the cookie instead of setting into heade
});


