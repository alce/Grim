#!/usr/local/bin/node
// generated by npm, please don't touch!
var dep = require('path').join(__dirname, "./../../../../../mongodb/0.7.9/dependencies")
var depMet = require.paths.indexOf(dep) !== -1
var from = "./../../../../../mongodb/0.7.9/package/lib/mongodb/commands/base_command"

if (!depMet) require.paths.unshift(dep)
module.exports = require(from)

if (!depMet) {
  var i = require.paths.indexOf(dep)
  if (i !== -1) require.paths.splice(i, 1)
}
