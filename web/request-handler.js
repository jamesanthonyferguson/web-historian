var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelper = require('./http-helpers.js')
// require more modules/folders here!



exports.handleRequest = function (req, res) {

  if (req.method === "GET" && req.url === "/") {
    res.writeHead(200, httpHelper.headers)
    httpHelper.serveAssets(res, "./web/public/index.html", "write")
    res.end()
  }

};
  // res.end(archive.paths.list);

