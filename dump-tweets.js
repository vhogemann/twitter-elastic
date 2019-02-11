//@ts-check
const fs = require("fs");
const axios  = require("axios").default;

let bearerToken = process.env.TWITTER_BEARER_TOKEN;

const headers = { 'Authorization': `Bearer ${bearerToken}` };

const client = axios.create({baseURL : 'https://api.twitter.com/1.1/tweets/search/', headers : headers})

let getTweets = next => {
    console.log('Loading ... ' + (next ? next : ''))
    return client.post('30day/dev.json',
        {
            query : 'from:startupdareal',
            next : next
        })
        .then(response => {
            if(response.data.results){
                response.data.results.forEach( tweet => {
                    let json = JSON.stringify(tweet);
                    fs.writeFileSync( `${__dirname}/tweets/${ tweet.id }.json`, json );
                });
            }
            if(response.data.next){
                console.log('waiting for 10s ...')
                var waitTill = new Date(new Date().getTime() + 10 * 1000);
                while(waitTill > new Date()){}
                return getTweets(response.data.next);
            }
        })
        .catch(error => {
            console.log(error);
        });
};

getTweets(undefined)
    .then(() => console.log('finished'));