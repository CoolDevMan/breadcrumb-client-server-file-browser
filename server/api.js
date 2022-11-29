const express = require("express");
const parser = require('./mypathsparser.js');

const app = express();

/**
 * Obtain a list of immediate children for the given path
 * 
 * @param {*} routes 
 * @param {*} paramPath 
 * @returns 
 */
const getRouteInfo = (routes, paramPath = "") => {
  // add "/" if path argument is empty or missing at the start
  paramPath = (paramPath.length === 0 || paramPath[0] !== '/') ? `/${paramPath}`: paramPath;
  
  // remove trailing "/" if found at the end
  paramPath = (paramPath.length > 1 && paramPath.slice(paramPath.length-1) === '/')
    ? paramPath.slice(0, paramPath.length-1)
    : paramPath;

  // array including the path itself and its immediate children
  const childrens = (paramPath === "/")
    ? routes.filter(({path, type}) => path.slice(0, path.lastIndexOf("/")) === "")
    : routes.filter(({path, type}) => (paramPath === path) || (path.slice(0, path.lastIndexOf("/")) === paramPath))

  if (childrens.length === 1 && childrens[0].type === "file") {
    // Given path is a file
    return childrens;
  } else if (childrens.length > 1) {
    // Given path is a directory
    return childrens.filter(({path, type}) => (path !== paramPath));
  } else {
    return [];
  }
}

app.get("/routes", (req, res) => {
  res.json({routes: parser.getRoutes()});
});

app.get("/path", (req, res) => {
  if ("mypath" in req.query) {
    res.json({ content: getRouteInfo(parser.getRoutes(), req.query.mypath) });
  } else {
    res.json({ content: []})
  }
});
  
var server = app.listen(8081, '0.0.0.0', function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at http://%s:%s", host, port)
});