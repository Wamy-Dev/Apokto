const express = require('express');
const helmet = require('helmet');
var session = require('express-session')
var cookieParser = require('cookie-parser')
var cors = require('cors')
var fs = require('fs');
const bodyParser = require('body-parser');
const { response } = require('express');
const app = express()
const port = 3001


app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
  }))
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "http://localhost:3000",);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
}
app.use(allowCrossDomain);
const corsOptions = {
    origin: 'http://localhost:3000',  //Your Client, do not write '*'
    credentials: true,
};
app.use(cors(corsOptions));
app.use(helmet());
app.use(cookieParser())
app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.status(200).send('<h3>Apokto API is online. 🐎</h3>')
  })
app.post('/create', async (req, res) => {
    var repos = req.body.repos;
    var newdir = Math.random().toString(36).substring(2, 12);
    try {
        if (!fs.existsSync("./lists/" + newdir)) {
          fs.mkdirSync("./lists/" + newdir);
        }
      } catch (err) {
        console.error(err);
      };
    var file = fs.createWriteStream("./lists/" + newdir + "/" +'cydia.list', {
        flags: 'w'
      });
    repos.forEach(repo => {
        var line = "deb " + repo + "./" + '\r\n'
        file.write(line)
    });
    req.session.file = newdir
    res.json({listname: newdir})
})
app.get('/create', (req, res) => {
    res.send('You arent supposed to be here.')
})
app.get('/download', (req, res) => {
    var file = req.session.file;
    res.download(__dirname + "/lists/" + `${file}/` + "cydia.list")
})
app.listen(port, () => {
    console.log(`Apokto API running on port ${port}`)
})


