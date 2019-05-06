const SteamUser = require('steam-user');
const request = require('request');
const moment = require('moment');
const _cliProgress = require('cli-progress');
const bar1 = new _cliProgress.Bar({}, _cliProgress.Presets.shades_classic)


const Item = require('../classes/item.js');
const config = require('../config.js');
const Database = require('../classes/db.js');


let db = new Database();


//REFRESH ALL DB ITEM
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
