const express = require('express');
const bodyParser = require('body-parser');
const wrap = require('express-async-wrapper');
const config = require('config');
const Sequelize = require('sequelize');

const { initializeModels } = require('./model');
const { getProfile } = require('./middleware/get-profile');
const handleErrors = require('./middleware/handle-errors');
const ContractsService = require('./services/contracts-service');
const JobsService = require('./services/jobs-service');
const MoneyService = require('./services/money-service');
const AdminController = require('./controllers/admin-controller');
const BalancesController = require('./controllers/balances-controller');
const ContractsController = require('./controllers/contracts-controller');
const JobsController = require('./controllers/jobs-controller');
const StatisticsService = require('./services/statistics-service');


/*
NOTES:

Requirements:
-The requirement about 25% of all jobs~ was unclear, because of bad grammar, so it was assumed that
the deposit amount should not exceed 25% of all user's unpaid jobs values summed together
-It was not defined where the deposit endpoint should get the deposit amount from, so its read from the body

Portential improvements:
-Decoupling of persistance library from the services (sequelize is passed to services)
-Groupping routes together and moving their definitions into separate files
-Profile operations could go into a separate service
-DECIMAL_RADIX could go into a constants file

TODO:
-custom error handler with custom errors
-input validation
*/

class Application {
    constructor({ port }) {
        this.port = port;
        this.sequelize = new Sequelize(config.get('sequelize'));
        initializeModels(this.sequelize)

        this.dataModels = this.sequelize.models;

        this.app = express();
        this.app.use(bodyParser.json());
        this.app.set('models', this.sequelize.models);

        this.initializeServices();
        this.initializeControllers();
        this.initializeRoutes();

        this.app.use(handleErrors);
    }

    initializeServices = () => {
        this.services = new Map();

        const contractsService = new ContractsService({
            dataModels: this.dataModels,
        });
        this.services.set('Contracts', contractsService);

        const moneyService = new MoneyService({
            dataModels: this.dataModels,
            sequelize: this.sequelize,
        });
        this.services.set('Money', moneyService);

        this.services.set('Jobs', new JobsService({
            dataModels: this.dataModels,
            moneyService,
            contractsService,
            sequelize: this.sequelize,
        }));

        this.services.set('Statistics', new StatisticsService({
            sequelize: this.sequelize,
        }));
    }

    initializeControllers = () => {
        this.controllers = new Map();

        const statisticsService = this.services.get('Statistics');
        this.controllers.set('Admin', new AdminController({ statisticsService }));

        const contractsService = this.services.get('Contracts');
        this.controllers.set('Contracts', new ContractsController({ contractsService }));

        const jobsService = this.services.get('Jobs');
        this.controllers.set('Jobs', new JobsController({ jobsService }));

        const moneyService = this.services.get('Money');
        this.controllers.set('Balances', new BalancesController({ moneyService }));
    }

    initializeRoutes = () => {
        //TODO group routes and split them into different files
        const contractsController = this.controllers.get('Contracts');
        this.app.get('/contracts/:id', getProfile, wrap(contractsController.getContract));
        this.app.get('/contracts', getProfile, wrap(contractsController.getAllContracts));

        const jobsController = this.controllers.get('Jobs');
        this.app.get('/jobs/unpaid', getProfile, wrap(jobsController.getUnpaidJobs));
        this.app.post('/jobs/:jobId/pay', getProfile, wrap(jobsController.pay));

        const balancesController = this.controllers.get('Balances');
        this.app.post('/balances/deposit/:userId', getProfile, wrap(balancesController.depositToUser));

        const adminController = this.controllers.get('Admin');
        this.app.get('/admin/best-profession', wrap(adminController.getBestProfession));
        this.app.get('/admin/best-clients', wrap(adminController.getBestClients));

    }

    start = (callback) => {
        return this.app.listen(this.port, callback);
    }
}

module.exports = Application;