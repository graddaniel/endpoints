"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var JobsService = function JobsService(_ref) {
  var dataModels = _ref.dataModels,
      moneyService = _ref.moneyService;

  _classCallCheck(this, JobsService);

  this.dataModels = dataModels;
  this.moneyService = moneyService;
};

module.exports = JobsService;