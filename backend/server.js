const express = require('express');
const helmet = require('helmet');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var fs = require('fs');
const bodyParser = require('body-parser');
require('dotenv').config();
const { exec } = require('child_process');
const app = express()
const port = 3001
app.use(session({
    secret: process.env.COOKIESECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
  }))
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "http://localhost:3000",);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", "true")
    next();
}
app.use(allowCrossDomain);
app.use(helmet());
app.use(cookieParser())
app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.status(200).send('<h3>Apokto API is online. 🐎</h3>')
  })
app.post('/create', async (req, res) => {
    var repos = req.body.repos;
    var repolist = Math.random().toString(36).substring(2, 12);
    var dir = "./lists/" + repolist + "/etc/apt/sources.list.d/"
    try {
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
      } catch (err) {
        console.error(err);
      } 
    var file = fs.createWriteStream(dir + `${repolist}.list`, {
        flags: 'w'
      });
    repos.forEach(repo => {
        var line = "deb " + repo + "./" + '\r\n'
        file.write(line)
    });
    //generate deb
    var debdir = "./lists/" + repolist + "/DEBIAN/"
    var builddeb = "./lists/" + repolist
    try {
      if (!fs.existsSync(debdir)) {
        fs.mkdirSync(debdir, { recursive: true });
      }
    } catch (err) {
      console.error(err);
    } 
    var package = fs.createWriteStream(debdir + `control`, {
      flags: 'w'
    });
    var packagetext = `Package: com.apokto.${repolist} \r\nName: ${repolist} \r\nVersion: 1.0 \r\nArchitecture: iphoneos-arm \r\nSection: Repo_Lists \r\nMaintainer: Wamy-Dev | contact@apokto.one \r\nDescription: Will install all the repos that was generated from list-> ${repolist}.` + " \r\n"
    package.write(packagetext)
    var builddeb = exec(`dpkg-deb --build --root-owner-group ${builddeb}`,
        (error, stdout, stderr) => {
            if (error !== null) {
                console.log(`exec error: ${error}`);
            }
            fs.rmSync(__dirname+`/lists/${repolist}`, { recursive: true, force: true });
        });
    req.session.file = repolist
    res.status(200).json({listname: repolist})
})
app.get('/create', (req, res) => {
    res.status(200).send('<h3>This is where you create your repo list. 🐎</h3>')
})
app.get('/download', (req, res) => {
    var file = req.session.file;
    if (file) {
      var dir = "./lists/" + `${file}.deb`
      res.download(dir)
    } else {
      res.status(200).send("<h3>This is where you download your repo list. 🐎</h3>")
    }
})
app.get('/addtorepo', async (req, res) => {
  var file = req.session.file;
  if (file) {
    var deb = `./lists/${file}.deb`
    try {
      if (!fs.existsSync("./debs")) {
        fs.mkdirSync("./debs");
      }
    } catch (err) {
      console.error(err);
    } 
    //move file
    try {
    var move = exec(`mv ${__dirname}/lists/${file}.deb ${__dirname}/debs/${file}.deb`, 
    (error, stdout, stderr) => {
      if (error !== null) {
          console.log(`exec error: ${error}`);
      }
      res.sendStatus(201)
    })
  } catch (err) {
    console.log(err)
  }
  } else {
    res.status(200).send("<h3>This is where you add your repo to the Apokto Repo. 🐎</h3>")
  }
})
app.listen(port, () => {
    console.log(`Apokto API running on port ${port}`)
})


