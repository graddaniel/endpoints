"use strict";

var config = require('config');

var Application = require('./application');

init();

function init() {
  var port, application;
  return regeneratorRuntime.async(function init$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          try {
            port = config.get('server.port');
            application = new Application({
              port: port
            });
            application.start(function () {
              console.log("Express App Listening on Port ".concat(port));
            });
          } catch (error) {
            console.error("An error occurred: ".concat(JSON.stringify(error)));
            process.exit(1);
          }

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
}