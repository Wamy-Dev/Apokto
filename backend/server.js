const express = require('express');
const helmet = require('helmet');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var fs = require('fs');
const util = require('util')
const bodyParser = require('body-parser');
require('dotenv').config();
const { exec } = require('child_process');
const md5File = require('md5-file')

const app = express()
const port = 3001
app.use(session({
    secret: process.env.COOKIESECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
  }))
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "https://apokto.one",);
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
    res.status(200).send('<h3><center>Apokto API is online. 🐎</center></h3>')
  })
app.post('/create', async (req, res) => {
    var repos = req.body.repos;
    var repolist = Math.random().toString(36).substring(2, 12);
    var dir = "./lists/" + repolist + "/etc/apt/sources.list.d/"
    //check if file exists, if not, make the dir
    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir, { recursive: true });
    }
    //create .list file
    var file = dir + `${repolist}.list`
    repos.forEach(repo => {
      var line = "deb " + repo + " ./" + '\r\n'
      fs.writeFileSync(file, line, {
        encoding: "utf8",
        flag: "a+"
      });
    });
    //generate deb
    var debdir = "./lists/" + repolist + "/DEBIAN/"
    var builddeb = "./lists/" + repolist
    fs.mkdirSync(debdir, { recursive: true })
    var package = debdir + `control`
    var packagetext = `Package: com.apokto.${repolist} \r\nName: ${repolist} \r\nVersion: 1.0 \r\nArchitecture: iphoneos-arm \r\nSection: Repo_Lists \r\nMaintainer: Wamy-Dev \r\nDescription: Will install all the repos that was generated from list-> ${repolist}.` + " \r\n"
    fs.writeFileSync(package, packagetext);
    var builddeb = exec(`dpkg-deb --build --root-owner-group ${builddeb}`,
        (error, stdout, stderr) => {
            if (error !== null) {
                console.log(`exec error: ${error}`);
            }
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
    function createPackage(file){
      //get current packages file
      fs.copyFileSync("/mnt/appdata/nginx/repo.apokto.one/Packages", `./lists/${file}/Packages`);
      var packagesfile = fs.createWriteStream(`./lists/${file}/Packages`, {
        flags: "a+"
      })
      var stats = fs.statSync(`./lists/${file}.deb`);
      var fileSize = stats.size;
      const md5sum = md5File.sync(`./lists/${file}.deb`)
      var packagestext = `\r\nPackage: com.apokto.${file} \r\nVersion: 1.0 \r\nArchitecture: iphoneos-arm \r\nMaintainer: Wamy-Dev \r\nFilename: debs/com.apokto.${file}.deb \r\nSize: ${fileSize} \r\nMD5sum: ${md5sum} \r\nSection: Repo_Lists \r\nDescription: Repo list generated at repo.apokto.one. Installs on top of your current repo list. Unless you generated this list, it is not recommended to use. To generate your own, go to https://apokto.one/build. \r\nAuthor: Wamy-Dev \r\nName: ${file}.list`
      packagesfile.write(packagestext, function() {
        fs.copyFileSync(`./lists/${file}/Packages`, `./lists/${file}/Packagesbk`);
        zipPackage(file)
      })
    }
    async function zipPackage(file) {
      var bzip2 = exec(`bzip2 ./lists/${file}/Packages -f`,
        (error, stdout, stderr) => {
          if (error !== null) {
            console.log(`exec error: ${error}`);
            }})
          shipPackage(file); 
      }
    function shipPackage(file) {
      try{
        fs.copyFileSync(`/apokto/lists/${file}/Packagesbk`, `/mnt/appdata/nginx/repo.apokto.one/Packages`,
          fs.copyFileSync(`/apokto/lists/${file}/Packages.bz2`, `/mnt/appdata/nginx/repo.apokto.one/Packages.bz2`,
            fs.copyFileSync(`/apokto/lists/${file}.deb`, `/mnt/appdata/nginx/repo.apokto.one/debs/com.apokto.${file}.deb`,
              res.sendStatus(201)
          )
        )
      )
      } catch (e) {
        res.sendStatus(404)
        console.log(e)
      }
    }
    await createPackage(file);
    
  } else {
    res.status(200).send("<h3>This is where you add your repo to the Apokto Repo. 🐎</h3>")
  }
})

app.listen(port, () => {
    console.log(`Apokto API running on port ${port}`)
})


