"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var config = require('config');

var Sequelize = require('sequelize');

var sequelize = new Sequelize(config.get('sequelize'));

var Profile =
/*#__PURE__*/
function (_Sequelize$Model) {
  _inherits(Profile, _Sequelize$Model);

  function Profile() {
    _classCallCheck(this, Profile);

    return _possibleConstructorReturn(this, _getPrototypeOf(Profile).apply(this, arguments));
  }

  return Profile;
}(Sequelize.Model);

Profile.init({
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  profession: {
    type: Sequelize.STRING,
    allowNull: false
  },
  balance: {
    type: Sequelize.DECIMAL(12, 2)
  },
  type: {
    type: Sequelize.ENUM('client', 'contractor')
  }
}, {
  sequelize: sequelize,
  modelName: 'profile'
});

var Contract =
/*#__PURE__*/
function (_Sequelize$Model2) {
  _inherits(Contract, _Sequelize$Model2);

  function Contract() {
    _classCallCheck(this, Contract);

    return _possibleConstructorReturn(this, _getPrototypeOf(Contract).apply(this, arguments));
  }

  return Contract;
}(Sequelize.Model);

Contract.init({
  terms: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM('new', 'in_progress', 'terminated')
  }
}, {
  sequelize: sequelize,
  modelName: 'contract'
});

var Job =
/*#__PURE__*/
function (_Sequelize$Model3) {
  _inherits(Job, _Sequelize$Model3);

  function Job() {
    _classCallCheck(this, Job);

    return _possibleConstructorReturn(this, _getPrototypeOf(Job).apply(this, arguments));
  }

  return Job;
}(Sequelize.Model);

Job.init({
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  price: {
    type: Sequelize.DECIMAL(12, 2),
    allowNull: false
  },
  paid: {
    type: Sequelize.BOOLEAN,
    "default": false
  },
  paymentDate: {
    type: Sequelize.DATE
  }
}, {
  sequelize: sequelize,
  modelName: 'job'
});
Profile.hasMany(Contract, {
  as: 'contractor',
  foreignKey: 'contractorId'
});
Contract.belongsTo(Profile, {
  as: 'contractor'
});
Profile.hasMany(Contract, {
  as: 'client',
  foreignKey: 'clientId'
});
Contract.belongsTo(Profile, {
  as: 'client'
});
Contract.hasMany(Job);
Job.belongsTo(Contract);
module.exports = {
  sequelize: sequelize,
  Profile: Profile,
  Contract: Contract,
  Job: Job
};