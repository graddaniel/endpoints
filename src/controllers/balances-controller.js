const { StatusCodes } = require('http-status-codes');


const DECIMAL_RADIX = 10;

class BalancesController {
    constructor({
        moneyService,
    }) {
        this.moneyService = moneyService;
    }

    depositToUser = async (req, res) => {
        const { id: profileId } = req.profile; //TODO probably useless
        const userId = parseInt(req.params.userId, DECIMAL_RADIX);
        const { amount } = req.body;

        await this.moneyService.depositToUser({
            currentUserId: profileId,
            targetUserId: userId,
            amount,
        });

        res.status(StatusCodes.OK).send('Deposit succesfull');
    }
};

module.exports = BalancesController;