'use strict';
// This file is requiring all the necessary packages
var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
// This requires the basename of the file that we are in, which is index.js
var basename  = path.basename(module.filename);
// This is getting the correct element for the config.json
var env       = process.env.NODE_ENV || 'development';
// This requires the config.json file
var config    = require(__dirname + '/../config/config.json')[env];
var db        = {};

// This line is creating a new Sequilize object that we will use the variables defined in the config.json file, unless there is a use_env_variable field
if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// This part of the code is running through all the files in the directory, unless they are ones we do not want 
// Such as this file, and a .gitignore.
fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(function(file) {
    // This creates an object with the file names and the imported files
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  // This will then associate any of the files that need to be
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// This is so that we can export db at the end of the file
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
