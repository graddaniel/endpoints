"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DECIMAL_RADIX = 10;

var ContractsController =
/*#__PURE__*/
function () {
  function ContractsController(_ref) {
    var contractsService = _ref.contractsService;

    _classCallCheck(this, ContractsController);

    this.contractsService = contractsService;
  }

  _createClass(ContractsController, [{
    key: "getContract",
    value: function getContract(req, res) {
      var contractId, profileId, contract;
      return regeneratorRuntime.async(function getContract$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              contractId = parseInt(req.params.id, DECIMAL_RADIX);
              profileId = req.profile.id;
              _context.next = 4;
              return regeneratorRuntime.awrap(this.contractsService.findContract({
                contractId: contractId,
                profileId: profileId
              }));

            case 4:
              contract = _context.sent;
              res.json(contract);

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }]);

  return ContractsController;
}();

module.exports = ContractsController;