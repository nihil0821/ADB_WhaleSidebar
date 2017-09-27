const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const multer = require('multer');
let _storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: _storage }) //file 들어갈 값
const path = require('path');
let app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.locals.pretty = true;
app.use('/user', express.static('uploads'));
app.set('views', path.join(__dirname, 'views_file'));
app.set('view engine', 'pug');
app.get('/upload', (req, res) => {
    res.render('upload');
});
app.post('/upload', upload.single('userfile'), (req, res) => { 
    // single 미들웨어가 리퀘스트 객체 안에 파일 프로퍼티를 생성한다.
    res.send('Uploaded: ' + req.file.filename);
})

app.listen(3000, () => {
    console.log('Connected, 3000 port!');
});