var http = require("http");
var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelper = require('./http-helpers.js')
// require more modules/folders here!

//Example URL for archive: www.oursite.com/?=www.google.com

var reg = /[www.]?[a-zA-Z0-9]+.[a-zA-Z]+/

exports.handleRequest = function (req, res) {

  // if (req.method === "OPTIONS") {
  //   var headers = httpHelper.headers
  //   headers.Allow = "HEAD,GET,PUT,DELETE,OPTIONS"
  //   res.writeHead(200, headers)
  //   res.end();
  // } else
  if (req.method === "GET" && req.url === "/") {
    res.writeHead(200, httpHelper.headers)
    httpHelper.serveAssets(res, path.join(__dirname, "../web/public/index.html"), "end")
  } else if (req.method === "GET" && reg.test(req.url)) {
    //call helper fn to see if in sites.txt
    var reqSite = String.prototype.slice.call(req.url, 1);
    archive.findUrlInArchiveList(archive.paths["list"], reqSite, function(){
      res.writeHead(200,httpHelper.headers);
      httpHelper.serveAssets(res, path.join(archive.paths["archivedSites"],reqSite), "end");
    }, function(){
      res.writeHead(404,httpHelper.headers);
      res.end();
    });
  } else if (req.method === "POST" && req.url === "/") {
    var data;
    req.on('data', function(chunk){
      data += chunk;
      if (data.length > 1e6) {
        req.connection.destroy();
      }
    });
    req.on('end', function(){
      data = String.prototype.slice.call(data, 13);
      archive.findUrlInArchiveList(archive.paths["list"],data, function(){
        res.writeHead(302,httpHelper.headers);
        httpHelper.serveAssets(res, path.join(archive.paths["archivedSites"], data), "end");
      },
      function(){
        archive.addUrlToList(archive.paths["list"], data, function(a){
          res.writeHead(302,httpHelper.headers);
          httpHelper.serveAssets(res, path.join(__dirname, "../web/public/loading.html"), "end");
        }, function(){
          res.writeHead(403,httpHelper.headers);
          res.end();
        })
      })
    })
  } else {
    res.writeHead(404,httpHelper.headers);
    res.end("YOU ARE LOST!");
  }
};
  // res.end(archive.paths.list);

