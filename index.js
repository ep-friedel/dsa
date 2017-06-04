#!/usr/bin/env node

const   express = require('express')
    ,   app = express()
    ,   server = require('http').createServer(app)
    ,   fs = require('fs')
    ,   https = require('https')
    ,   bodyParser = require('body-parser')
    ,   server_port = process.env.DSA_PORT
    ,   server_ip_address = 'localhost'
    ,   sslServer = https.createServer({
            key: fs.readFileSync(process.env.KEYSTORE + 'fochlac_com_key.pem'),
            cert: fs.readFileSync(process.env.KEYSTORE + 'fochlac_com_cert_chain.pem')
        }, app)
    ,   mysql = require('mysql')
    ,   DBName = 'dsa';

let myDb;

app.use(bodyParser.json());

function initDb () {
    let db = mysql.createConnection({
          host     : process.env.DSA_DB_HOST,
          port     : process.env.DSA_DB_PORT,
          user     : process.env.DSA_DB_USERNAME,
          password : process.env.DSA_DB_PASSWORD,
          database : DBName
        });

    db.on('error', (err) => {
        if (err){
            if (err.code !== 'PROTOCOL_CONNECTION_LOST') {
                throw('MySQL-ConnectionError: ' + err);
            } else {
                myDb = initDb();
            }
        }
    });

    db.connect((err) => {
        if (err) {
            throw('MySQL-ConnectionError: ' + err);
        }
    });

    return db;
};

sslServer.listen(server_port, server_ip_address, () => {
    console.log('listening on port '+ server_port);
});


app.use('/', express.static(process.env.DSA_HOME + 'Public'));

myDb = initDb();

myDb.query('CREATE TABLE IF NOT EXISTS `stories` ( `id` varchar(20) NOT NULL, `content` mediumtext NOT NULL, UNIQUE KEY `id` (`id`) );',(err) => {
    if (err) console.log(err);
});

app.get('/api/stories', (req, res) => {
    new Promise((resolve, reject) => {
        myDb.query('SELECT * FROM `stories`;', (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    }).then((result) => {
        res.status(200).send(JSON.stringify(result.reduce((b,a) => {b[a.id] = a.content; return b}, {})));
    })
    .catch((err) => {
        res.status(500).send();
    });
});

app.put('/api/stories', (req, res) => {
    let ids = Object.keys(req.body),
        datastring = ids.map(id => '("' + id + '", "' + req.body[id].replace(/"/g, '\\"') + '")').join(', ');

    new Promise((resolve, reject) => {
        myDb.query('INSERT INTO  `stories` (`id`,`content`) VALUES ' + datastring + ' ON DUPLICATE KEY UPDATE `content`=VALUES(`content`);', (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    }).then((result) => {
        res.status(200).send();
    })
    .catch((err) => {
	console.log(err);
        res.status(500).send(err + datastring);
    });
});

app.get('/*', (req, res) => res.redirect('https://' + req.headers.host + '/index.html'));
