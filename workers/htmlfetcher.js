// eventually, you'll have some code here that uses the code in `archive-helpers.js`
// to actually download the urls you want to download.
var archive = require("../helpers/archive-helpers.js")
var fs = require("fs");
var path = require("path");
var request = require("http-request");

//read list of urls
var fetchHtml = function(){
  archive.readListOfUrls(function(data){
    for(var url in data){
      fs.readFile(archive.paths.archivedSites, "utf-8", function(err, data){
        if (err) {
          //download and write
          request.get("http://"+url, function(err, data){
            if (err){
              console.log("Couldn't fetch the html");
            } else {
              if (data.status === 200){
                fs.writeFile(archive.paths.archivedSites + "/" + url, data.buffer.toString(), function(err){
                  if(err){
                    console.log("Couldn't write to file");
                  } else {
                    console.log("wrote html for: " + url)
                  }
                });
              }
            }
          });
        } else {
          console.log("File already downloaded");
        }
      });
    }
  });
};

//for each url,
  //if no entry in archives/sites/
  //download url html
  //write to archives/sites/URLNAME.txt
exports.fetch = fetchHtml;
