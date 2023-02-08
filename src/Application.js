const express = require('express');
const bodyParser = require('body-parser');

const { sequelize } = require('./model');
const { getProfile } = require('./middleware/getProfile');

class Application {
    constructor({ port }) {
        this.port = port;

        this.app = express();;
        this.app.use(bodyParser.json());
        this.app.set('sequelize', sequelize);
        this.app.set('models', sequelize.models);

        /**
         * FIX ME!
         * @returns contract by id
         */
        this.app.get('/contracts/:id', getProfile, async (req, res) => {
            const { Contract } = req.app.get('models')
            const { id } = req.params;
            const contract = await Contract.findOne({ where: { id } });

            if (!contract) {
                return res.status(404).end();
            }

            res.json(contract);
        });
    }

    start(callback) {
        return this.app.listen(this.port, callback);
    }
}

module.exports = Application;