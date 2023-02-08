"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// TODO Dont couple this class with persistance layer
var _require = require('sequelize'),
    Op = _require.Op;

var ContractsService =
/*#__PURE__*/
function () {
  function ContractsService(_ref) {
    var contractModel = _ref.contractModel;

    _classCallCheck(this, ContractsService);

    this.contractModel = contractModel;
  }

  _createClass(ContractsService, [{
    key: "findContract",
    value: function findContract(criteria) {
      var contractId, profileId, contract;
      return regeneratorRuntime.async(function findContract$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              contractId = criteria.contractId, profileId = criteria.profileId;
              _context.next = 3;
              return regeneratorRuntime.awrap(this.contractModel.findOne({
                where: {
                  id: contractId
                }
              }));

            case 3:
              contract = _context.sent;

              if (contract) {
                _context.next = 6;
                break;
              }

              throw new Error('Contract not found');

            case 6:
              if (!(contract.clientId !== profileId && contract.contractorId !== profileId)) {
                _context.next = 8;
                break;
              }

              throw new Error("You're not allowed to access this contract");

            case 8:
              return _context.abrupt("return", contract);

            case 9:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }]);

  return ContractsService;
}();

module.exports = ContractsService;