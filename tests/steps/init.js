'use strict';
const co = require('co');
const Promise = require('bluebird');
const awscred = Promise.promisifyAll(require('../../lib/awscred'));


let initialized = false;

let init = co.wrap(function* (){
    if (initialized) {
        return;
    }
    process.env.restaurants_api = "https://1k3vh5uqzl.execute-api.eu-west-1.amazonaws.com/dev/restaurants";
    process.env.restaurant_table = "restaurants";
    process.env.AWS_REGION = "eu-west-1";
    process.env.cognito_client_id = "j931tvl2lem9fl2scjn2kj3f9";
    process.env.cognito_user_pool_id = "eu-west-1_XUJlg27NJ";
    process.env.cognito_server_client_id = "2qegmh9bq94abltrvbhe019r1i";
    
    if (!process.env.AWS_ACCESS_KEY_ID) {
        let cred = (yield awscred.loadAsync()).credentials;
        process.env.AWS_ACCESS_KEY_ID = cred.accessKeyId;
        process.env.AWS_SECRET_ACCESS_KEY = cred.secretAccessKey;
        if (cred.sessionToken) {
            process.env.AWS_SESSION_TOKEN = cred.sessionToken;
            }
      }

    initialized = true;
});

module.exports.init = init;