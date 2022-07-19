const express = require('express');
const helmet = require('helmet');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var fs = require('fs');
const util = require('util')
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
      var line = "deb " + repo + "./" + '\r\n'
      fs.writeFileSync(file, line);
    });
    //generate deb
    var debdir = "./lists/" + repolist + "/DEBIAN/"
    var builddeb = "./lists/" + repolist
    fs.mkdirSync(debdir, { recursive: true })
    var package = debdir + `control`
    var packagetext = `Package: com.apokto.${repolist} \r\nName: ${repolist} \r\nVersion: 1.0 \r\nArchitecture: iphoneos-arm \r\nSection: Repo_Lists \r\nMaintainer: Wamy-Dev | contact@apokto.one \r\nDescription: Will install all the repos that was generated from list-> ${repolist}.` + " \r\n"
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
/*app.get('/addtorepo', async (req, res) => {
  var file = req.session.file;
  if (file) {
    var deb = `/debs/${file}.deb`
    try {
      if (!fs.existsSync("/debs")) {
        fs.mkdirSync("/debs");
      }
    } catch (err) {
      console.error(err);
    }
    try {
      if (!fs.existsSync("/packages")) {
        fs.mkdirSync("/packages");
      }
    } catch (err) {
      console.error(err);
    }
    //move file
    try {
    var move = exec(`mv ${__dirname}/lists/${file}.deb ${__dirname}/debs/`, 
    (error, stdout, stderr) => {
      if (error !== null) {
          console.log(`exec error: ${error}`);
      }
      //get and edit packages file
      function createPackages(file){
        var getpackages = exec(`cp /mnt/user/appdata/nginx/config/apoktorepo/Packages mnt/user/appdata/apokto/packages/`,
          (error, stdout, stderr) => {
          if (error !== null) {
            console.log(`exec error: ${error}`);
          }
          console.log('recieved')
          var packages = fs.createWriteStream("/packages/Packages", {
            flags: 'a+'
          });
          var stats = fs.statSync(__dirname+`/debs/${file}.deb`);
          var fileSize = stats.size;
          var packagestext = `\r\nPackage: com.apokto.${file} \r\nVersion: 1.0 \r\nArchitecture: iphoneos-arm \r\nMaintainer: Wamy-Dev | contact@apokto.one \r\nFilename: debs//${file}.deb \r\nFilesize: ${fileSize} \r\nSection: Repo_Lists \r\nDescription: Repo list generated at repo.apokto.one. Installs on top of your current repo list. Unless you generated this list, it is not recommended to use. To generate your own, go to https://apokto.one/build. \r\nAuthor: Wamy-Dev | Contact@apokto.one \r\nDepiction: https://repo.apokto.one/?/index.html \r\nName: ${file} | apokto.one`
          packages.write(packagestext)
          console.log('edited')
          //zip and ship
          var cp = exec(`cp /packages/Packages /packages/Packages1`)
          var bzip2 = exec(`bzip2 /packages/Packages -f`,
          (error, stdout, stderr) => {
            if (error !== null) {
              console.log(`exec error: ${error}`);
            }
            console.log('zipped')
            var movezipped = exec(`cp /mnt/user/appdata/apokto/packages/Packages.bz2 /mnt/user/appdata/nginx/config/apoktorepo/`, 
            (error, stdout, stderr) => {
              if (error !== null) {
                console.log(`exec error: ${error}`);
              }
              console.log('shipped zipped')
              var movepackage = exec(`cp /mnt/user/appdata/apokto/packages/Packages1 /mnt/user/appdata/nginx/config/apoktorepo/Packages`, 
              (error, stdout, stderr) => {
                if (error !== null) {
                console.log(`exec error: ${error}`);
                }
                console.log('shipped edited')
              })
            })
          })
        }) 
      }
      createPackages(file)
      res.sendStatus(201)
    })
  } catch (err) {
    console.log(err)
  }
  } else {
    res.status(200).send("<h3>This is where you add your repo to the Apokto Repo. 🐎</h3>")
  }
})
*/
app.listen(port, () => {
    console.log(`Apokto API running on port ${port}`)
})


