const express = require('express');
const bodyParser = require('body-parser');
const { StatusCodes } = require('http-status-codes');
const wrap = require('express-async-wrapper');
const config = require('config');
const Sequelize = require('sequelize');

const { initializeModels } = require('./model');
const { getProfile } = require('./middleware/get-profile');
const ContractsService = require('./services/contracts-service');
const JobsService = require('./services/jobs-service');
const MoneyService = require('./services/money-service');
const BalancesController = require('./controllers/balances-controller');
const ContractsController = require('./controllers/contracts-controller');
const JobsController = require('./controllers/jobs-controller');


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

        //TODO export to middleware
        this.app.use((error, req, res, next) => {
            console.error(`Custom error handler: ${error}`);
            console.error(error);

            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error.message);
        });
    }

    initializeServices = () => {
        this.services = new Map();

        //TODO maybe dont pass all the models at once
        const contractsService = new ContractsService({
            dataModels: this.dataModels,
        });
        this.services.set('Contracts', contractsService);

        const moneyService = new MoneyService({
            dataModels: this.dataModels,
        });
        this.services.set('Money', moneyService);

        this.services.set('Jobs', new JobsService({
            dataModels: this.dataModels,
            moneyService,
            contractsService,
            sequelize: this.sequelize,
        }));
    }

    initializeControllers = () => {
        this.controllers = new Map();

        const moneyService = this.services.get('Money');
        this.controllers.set('Balances', new BalancesController({ moneyService }));

        const contractsService = this.services.get('Contracts');
        this.controllers.set('Contracts', new ContractsController({ contractsService }));

        const jobsService = this.services.get('Jobs');
        this.controllers.set('Jobs', new JobsController({ jobsService }));
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
        this.app.get('/admin/best-profession?start=<date>&end=<date>', (req, res) => res.status(200).send("NOT IMPLEMENTED"));
        this.app.get('/admin/best-clients?start=<date>&end=<date>&limit=<integer>', (req, res) => res.status(200).send("NOT IMPLEMENTED"));

    }

    start = (callback) => {
        return this.app.listen(this.port, callback);
    }
}

module.exports = Application;