const express = require('express');
const bodyParser = require('body-parser');
const { StatusCodes } = require('http-status-codes');

const { sequelize } = require('./model');
const { getProfile } = require('./middleware/getProfile');

class Application {
    constructor({ port }) {
        this.port = port;

        this.app = express();;
        this.app.use(bodyParser.json());
        this.app.set('sequelize', sequelize);
        this.app.set('models', sequelize.models);

        this.initializeRoutes();
    }

    initializeRoutes() {
        this.app.get('/contracts/:id', getProfile, async (req, res) => {
            const { Contract } = req.app.get('models');
            const { id } = req.params;
            const contract = await Contract.findOne({ where: { id } });

            if (!contract) {
                return res.status(StatusCodes.NOT_FOUND).end();
            }

            res.json(contract);
        });
    }

    start(callback) {
        return this.app.listen(this.port, callback);
    }
}

module.exports = Application;