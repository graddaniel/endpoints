const express = require('express');
const bodyParser = require('body-parser');
const { StatusCodes } = require('http-status-codes');
const wrap = require('express-async-wrapper')
// TODO Dont couple this class with persistance layer
const { Op } = require("sequelize");


const { sequelize } = require('./model');
const { getProfile } = require('./middleware/getProfile');

const DECIMAL_RADIX = 10;

class Application {
    constructor({ port }) {
        this.port = port;

        this.app = express();;
        this.app.use(bodyParser.json());
        this.app.set('sequelize', sequelize);
        this.app.set('models', sequelize.models);

        this.initializeRoutes();

        this.app.use((error, req, res, next) => {
            console.error(`Custom error handler: ${error}`);

            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Unexpected error');
        });
    }

    initializeRoutes() {
        this.app.get('/contracts/:id', getProfile, wrap(async (req, res) => {
            const contractId = parseInt(req.params.id, DECIMAL_RADIX);
            const { id: profileId } = req.profile;
            const { contract: contractModel } = req.app.get('models');

            const contract = await contractModel.findOne({
                where: {
                    [Op.and]: [
                        { id: contractId },
                        {
                            [Op.or]: [
                                { contractorId: profileId },
                                { clientId: profileId },
                            ],
                        },
                    ],
                }
            });
            
            if (!contract) {
                return res.status(StatusCodes.NOT_FOUND).end();
            }

            res.json(contract);
        }));
    }

    start(callback) {
        return this.app.listen(this.port, callback);
    }
}

module.exports = Application;