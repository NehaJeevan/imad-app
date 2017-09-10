var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;

var config = {
    user:'nehajeevan28',
    database:'nehajeevan28',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password: process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));

var articles = {
'article-one': {
    title:'Article One| Neha Jeevan',
    heading:'Article One',
    date:'Sep 5, 2016',
    content:    `
            <p>
                This is content for article one.This is content for article one.This is content for article one.This is content for article one.This is content for article one.This is content for article one.This is content for article one.This is content for article one.This is content for article one.This is content for article one.This is content for article one.This is content for article one.
            </p>
            <p>
                This is content for article one.This is content for article one.This is content for article one.This is content for article one.This is content for article one.This is content for article one.This is content for article one.This is content for article one.This is content for article one.This is content for article one.This is content for article one.This is content for article one.
            </p>
            <p>
                This is content for article one.This is content for article one.This is content for article one.This is content for article one.This is content for article one.This is content for article one.This is content for article one.This is content for article one.This is content for article one.This is content for article one.This is content for article one.This is content for article one.
            </p>`
},
'article-two': {
        title:'Article Two| Neha Jeevan',
    heading:'Article Two',
    date:'Sep 5, 2016',
    content:    `
            <p>
                This is content for article two.
            </p>`
},
'article-three': {
        title:'Article Three| Neha Jeevan',
    heading:'Article Three',
    date:'Sep 5, 2016',
    content:    `
            <p>
                This is content for article three.
            </p>`
}
};

function createTemplate(data){
    var title = data.title;
    var date = data.date;
    var heading = data.heading;
    var content = data.content;
var htmlTemplate = `
<html>
    <head>
        <title>
            ${title};
        </title>
        <meta name = "viewport" content = "width=device-width, initial-scale=1" />
        <link href="/ui/style.css" rel="stylesheet" />
    </head>
    <body>
    <div class="container">
        <div>
            <a href="/">Home</a>
        </div>
        <hr/>
        <h3>
            ${heading}
        </h3>
        <div>
            ${date}
        </div>
        <div>
            ${content}
        </div>
    </div>
    </body>
</html>
`;
return htmlTemplate;
}

var pool = new Pool(config);
app.get('/test-db',function(req,res){
    pool.query('SELECT * FROM user',function(err,result){
        if(err){
            res.status(500).send(err.toString());
        }
        else{
            res.send(JSON.stringify(result.rows));
        }
    });
});

var counter = 0;
app.get('/counter',function(req,res){
    counter+=1;
    res.send(counter.toString());
});

var names=[];
app.get('/submit-name',function(req,res){  //submit-name?name=xxxx
    var name =req.query.name;
    names.push(name);
    res.send(JSON.stringify(names));
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/:articleName', function (req, res) {
  var articleName = req.params.articleName;
  res.send(createTemplate(articles[articleName]));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
