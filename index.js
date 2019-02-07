const SteamUser = require('steam-user');
const SteamCommunity  = require('steamcommunity');
var community = new SteamCommunity();
const request = require('request');

let client = new SteamUser();
client.logOn({	
	"accountName": "",
	"password": ""
});

client.on('loggedOn', function(details, parental){
	console.log('Client : loggedOn !')
	console.log(parental)    
});

client.on('webSession', function(sessionID, cookies) {
	console.log("Client : Got web session");
	//console.log(sessionID)
	//console.log(cookies)
	request({
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
  		});
	//Set the cookie instead of setting into heade
});
/*

*/
/*
var ReadLine = require('readline');
var fs = require('fs');

var rl = ReadLine.createInterface({
	"input": process.stdin,
	"output": process.stdout
});

rl.question("Username: ", function(accountName) {
	rl.question("Password: ", function(password) {
		rl.question("Two-Factor Auth Code: ", function(authCode) {
			rl.question("Revocation Code: R", function(rCode) {
				doLogin(accountName, password, authCode, "", rCode);
			});
		});
	});
});

function doLogin(accountName, password, authCode, captcha, rCode) {
	community.login({
		"accountName": accountName,
		"password": password,
		"twoFactorCode": authCode,
		"captcha": captcha
	}, function(err, sessionID, cookies, steamguard) {
		if(err) {
			if(err.message == 'SteamGuard') {
				console.log("This account does not have two-factor authentication enabled.");
				process.exit();
				return;
			}

			if(err.message == 'CAPTCHA') {
				console.log(err.captchaurl);
				rl.question("CAPTCHA: ", function(captchaInput) {
					doLogin(accountName, password, authCode, captchaInput);
				});

				return;
			}

			console.log(err);
			process.exit();
			return;
		}

		console.log("Logged on!");
		community.disableTwoFactor("R" + rCode, function(err) {
			if(err) {
				console.log(err);
				process.exit();
				return;
			}

			console.log("Two-factor authentication disabled!");

			request({
			headers:{
				'Host': 'steamcommunity.com',
				'Connection': 'keep-alive',
				'Cache-Control': 'max-age=0',
				'Upgrade-Insecure-Requests': 1,
				'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.81 Safari/537.36',
				'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng',
				'Accept-Encoding': 'gzip, deflate, br',
				'Accept-Language': 'fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7',
				'Cookie': cookies.join(';')
			}, 
			uri: 'https://steamcommunity.com/market/pricehistory/?country=US&currency=1&appid=730&market_hash_name=Glove%20Case%20Key',
    		body: formData,
    		method: 'GET'
  		}, function (err, res, body) {
  			console.log(res)
  		});
			process.exit();
		});
	});
}*/