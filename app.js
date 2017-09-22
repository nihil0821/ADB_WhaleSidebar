const path = require('path');
const express = require('express');
const app = express();
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public')); //정적인 파일이 위치할 디렉토리 경로
app.get('/form', (req, res) => {
    res.render('form');
});
app.get('/form_receiver', (req, res) => {
    let title = req.query.title;
    let description = req.query.description;
    res.send(title + "," + description);
});
app.get('/topic:id', (req, res) => {
    let topics = [
        'JavaScript is ...',
        'Nodejs is ...',
        'Express is ...'
    ];
    let output = `
    <a href="/topic?id=0">JavaScript</a><br>
    <a href="/topic?id=1">Nodejs</a><br>
    <a href="/topic?id=2ssf">Express</a><br><br>
    ${topics[req.params.id]}`;

    res.send(output);

});
app.get('/topic/:id/:mode', (req, res) => {
    res.send(req.params.id + ',' + req.params.mode)
}); 
app.get('/template', (req, res) => {
    res.render('temp', {_time:Date(), title:'Pug'});
});
app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/dynamic', (req, res) => {
    let output = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8">
            <title></title>
        </head>
        <body>
            Hello dynamic html
        </body>
    </html>`;
    res.send(output);
});

app.get('/route', (req, res) => {
    res.send('Hellow Router, <img src="/route.png">');
});

app.listen(3000, "10.12.61.148", () => {
    console.log('Example app listening on port 3000!');
});