'use strict';
const co = require('co');
const Promise = require('bluebird');
const awscred = Promise.promisifyAll(require('awscred'));

let initialized = false;

let init = co.wrap(function* (){
    if (initialized) {
        return;
    }
    process.env.restaurants_api = "https://1k3vh5uqzl.execute-api.eu-west-1.amazonaws.com/dev/restaurants";
    process.env.restaurants_table = "restaurants";
    process.env.AWS_REGION = "eu-west-1s";
    process.env.cognito_client_id = "test_cognito_client_id";
    process.env.cognito_user_pool_id = "test_cognito_user_pool_id";

    let cred = (yield awscred.loadAsync()).credentials;

    process.env.AWS_ACCESS_KEY_ID = cred.accessKeyId;
    process.env.AWS_SECRET_ACCESS_KEY = cred.secretAccessKey;

    console.log("AWS credentials loaded");

    initialized = true;
});

module.exports.init = init;