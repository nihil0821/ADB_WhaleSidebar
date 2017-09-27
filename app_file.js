const express = require('express');
let bodyParser = require('body-parser');
let fs = require('fs');
const path = require('path');
let app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.locals.pretty = true;
app.set('views', path.join(__dirname, 'views_file'));
app.set('view engine', 'pug');
app.get('/topic/new', (req, res) => {
    fs.readdir('data', (err, files) => {
        if(err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
    res.render('new', {topics:files});
    });
});

app.get(['/topic', '/topic/:id'], (req, res) => {
    fs.readdir('data', (err, files) => {
        if(err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        let id = req.params.id; //null or undefind는 js에서 false와 등가
        if(id) {
            fs.readFile('data/'+id, 'utf8', (err, data) => {
                if(err) {
                    console.log(err);
                    res.status(500).send('Internal Server Error');
                }
                res.render('view', {topics:files, title: id, description: data});
            });
        } else {
            res.render('view', {topics: files, title: 'Welcome', description: 'Hello, JavaScript for NodeJS'});
        }
    });
});
app.post('/topic', (req, res) => {
    let title = req.body.title;
    let description = req.body.description;
    fs.writeFile('data/'+title, description, err => {
        if(err) {
            res.status(500).send('Internal Server Error');
        }
        res.redirect('/topic/' + title);
    });
});
app.listen(3000, () => {
    console.log('Connected, 3000 port!');
});