"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var express = require('express');

var bodyParser = require('body-parser');

var _require = require('http-status-codes'),
    StatusCodes = _require.StatusCodes;

var wrap = require('express-async-wrapper');

var _require2 = require('./model'),
    sequelize = _require2.sequelize;

var _require3 = require('./middleware/getProfile'),
    getProfile = _require3.getProfile;

var ContractsService = require('./services/ContractsService');

var ContractsController = require('./controllers/contractsController');

var Application =
/*#__PURE__*/
function () {
  function Application(_ref) {
    var port = _ref.port;

    _classCallCheck(this, Application);

    this.port = port;
    this.dataModels = sequelize.models;
    this.app = express();
    this.app.use(bodyParser.json());
    this.app.set('models', sequelize.models);
    this.initializeServices();
    this.initializeControllers();
    this.initializeRoutes(); //TODO export to middleware

    this.app.use(function (error, req, res, next) {
      console.error("Custom error handler: ".concat(error));
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Unexpected error');
    });
  }

  _createClass(Application, [{
    key: "initializeServices",
    value: function initializeServices() {
      this.services = new Map();
      this.services.set('Contracts', new ContractsService({
        contractModel: this.dataModels.contract
      }));
    }
  }, {
    key: "initializeControllers",
    value: function initializeControllers() {
      this.controllers = new Map();
      var contractsService = this.services.get('Contracts');
      this.controllers.set('Contracts', new ContractsController({
        contractsService: contractsService
      }));
    }
  }, {
    key: "initializeRoutes",
    value: function initializeRoutes() {
      var contractsController = this.controllers.get('Contracts');
      this.app.get('/contracts/:id', getProfile, wrap(contractsController.getContract));
    }
  }, {
    key: "start",
    value: function start(callback) {
      return this.app.listen(this.port, callback);
    }
  }]);

  return Application;
}();

module.exports = Application;