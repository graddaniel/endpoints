const { StatusCodes } = require('http-status-codes');

class BalancesController {
    constructor({
        moneyService,
    }) {
        this.moneyService = moneyService;
    }

    depositToUser = async (req, res) => {
        const { id: profileId } = req.profile;
        const { userId } = req.params;
        //TODO finish when requirement is clear
        const amount = 100; //maybe from the payload?
        await this.moneyService.depositToUser({
            userId,
            amount,
        });

        res.status(StatusCodes.OK).send('Deposit succesfull');
    }
};

module.exports = BalancesController;