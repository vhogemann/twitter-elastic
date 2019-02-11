//@ts-check
const fs = require('fs').promises;
const moment = require('moment')
const elasticsearch = require('elasticsearch');

const client = new elasticsearch.Client({
	host: 'localhost:9200',
	log: 'info'
});

let queue = [];

let index = docs => {
    let commands = docs.map(doc => [ { index: { _index: 'tweets', _type: 'tweet', _id: doc.id }}, doc ]);
    let body = [].concat.apply([],commands); 
    let params = { body: body };
    console.log('Indexing ... ');
    return client.bulk(params) 
}

let enqueue = file => 
    fs.readFile( __dirname + '/tweets/' + file, { encoding : 'UTF-8'})
        .then(json => JSON.parse(String(json)))
        .then(doc => {
            doc.timestamp = moment(doc['created_at'],'ddd MMM D HH:mm:ss ZZ YYYY').toDate();
            return doc;
        })
        .then(file => {
            if(queue.length > 500) {
                let batch = queue;
                queue = [];
                console.log('queue full!');
                return index(batch);
            } 
            queue.push(file);
            return 'enqued!';
        });

let indexAll = files => {
    if(files.length > 0) {
        let file = files.pop();
        console.log(file + ' - ' + files.length);
        return enqueue(file)
            .then(result => {
                console.log(result);
                return indexAll(files);
            })
            .then(()=>'Done!');
    } else {
        if (queue.length > 0) {
            return index(queue).then(()=>'Done!')    
        }
        return 'All Done!';
    }
}

fs.readdir( __dirname + '/tweets' )
    .then(files => indexAll(files))
    .then(console.log);
