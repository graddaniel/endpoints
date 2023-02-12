const Sequelize = require('sequelize');


class Profile extends Sequelize.Model {}
class Contract extends Sequelize.Model {}
class Job extends Sequelize.Model {}

function initializeModels(sequelize) {
  Profile.init(
    {
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
      balance:{
        type:Sequelize.DECIMAL(12,2)
      },
      type: {
        type: Sequelize.ENUM('client', 'contractor')
      }
    },
    {
      sequelize,
      modelName: 'profile'
    }
  );

  Contract.init(
    {
      terms: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      status:{
        type: Sequelize.ENUM('new','in_progress','terminated')
      }
    },
    {
      sequelize,
      modelName: 'contract'
    }
  );

  Job.init(
    {
      description: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      price:{
        type: Sequelize.DECIMAL(12,2),
        allowNull: false
      },
      paid: {
        type: Sequelize.BOOLEAN,
        default:false
      },
      paymentDate:{
        type: Sequelize.DATE
      }
    },
    {
      sequelize,
      modelName: 'job'
    }
  );

  Profile.hasMany(Contract, {as :'contractor',foreignKey:'contractorId'});
  Contract.belongsTo(Profile, {as: 'contractor'});
  Profile.hasMany(Contract, {as : 'client', foreignKey:'clientId'});
  Contract.belongsTo(Profile, {as: 'client'});
  Contract.hasMany(Job);
  Job.belongsTo(Contract);
}

module.exports = {
  initializeModels,
  Profile,
  Contract,
  Job,
};
