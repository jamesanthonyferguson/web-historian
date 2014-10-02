var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.findUrlInArchiveList = function(asset, url, callback, errFn){
  fs.readFile(asset, "utf-8", function(err, data) {
    if (err) {console.log('couldnt read sitestxt:' + err)
    } else {
      data = JSON.stringify(data);
      if (data.indexOf(url) !== -1) {
        callback(data)
      } else {
        errFn()
      }
    }
  });
};

exports.addUrlToList = function(asset, url, callback, errFn){
  var site = String.prototype.slice.call(url, 13);
  site = url + "\n";
  fs.appendFile(asset, site, function(err) {
    if (err) {
      console.log('Couldnt add site to file: '+ err);
      errFn();
    } else {
      callback(site);
    }
  });
};

exports.readListOfUrls = function(callback){
  fs.readFile(exports.paths.list, "utf-8", function(err, data){
    if (err) {
      console.log('couldnt read sitestxt: ' + err)
    } else {
      var data2 = data.split( '\n' );
      callback(data2);
    }
  });
};

// exports.isURLArchived = function(){

// };

exports.downloadUrls = function(){
};

