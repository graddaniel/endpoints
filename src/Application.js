const express = require('express');
const bodyParser = require('body-parser');
const { StatusCodes } = require('http-status-codes');
const wrap = require('express-async-wrapper')

const { sequelize } = require('./model');
const { getProfile } = require('./middleware/getProfile');
const ContractsService = require('./services/ContractsService');
const ContractsController = require('./controllers/contractsController');


class Application {
    constructor({ port }) {
        this.port = port;
        this.dataModels = sequelize.models;

        this.app = express();
        this.app.use(bodyParser.json());
        this.app.set('models', sequelize.models);

        this.initializeServices();
        this.initializeControllers();
        this.initializeRoutes();

        //TODO export to middleware
        this.app.use((error, req, res, next) => {
            console.error(`Custom error handler: ${error}`);

            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Unexpected error');
        });
    }

    initializeServices = () => {
        this.services = new Map();

        this.services.set('Contracts', new ContractsService({
            contractModel: this.dataModels.contract,
        }));
    }

    initializeControllers = () => {
        this.controllers = new Map();

        const contractsService = this.services.get('Contracts');
        this.controllers.set('Contracts', new ContractsController({ contractsService }));
    }

    initializeRoutes = () => {
        const contractsController = this.controllers.get('Contracts');
        this.app.get('/contracts/:id', getProfile, wrap(contractsController.getContract));
    }

    start = (callback) => {
        return this.app.listen(this.port, callback);
    }
}

module.exports = Application;