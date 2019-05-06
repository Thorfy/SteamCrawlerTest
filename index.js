const SteamUser = require('steam-user');
const request = require('request');
const moment = require('moment');
const _cliProgress = require('cli-progress');
const bar1 = new _cliProgress.Bar({}, _cliProgress.Presets.shades_classic)


const Item = require('./classes/item.js');
const config = require('./config.js');
const Database = require('./classes/db.js');


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
	console.log("Client : Got web session");
    console.log(sessionID)
    console.log(cookies)
});



