const { StatusCodes } = require('http-status-codes');

const AmountValidator = require('./validators/amount-validator');
const IdValidator = require('./validators/id-validator');


const DECIMAL_RADIX = 10;

class BalancesController {
    constructor({
        moneyService,
    }) {
        this.moneyService = moneyService;
    }

    depositToUser = async (req, res) => {
        const { id: profileId } = req.profile;
        const userId = parseInt(req.params.userId, DECIMAL_RADIX);
        const { amount } = req.body;

        AmountValidator.validate(amount);
        IdValidator.validate(userId);

        await this.moneyService.depositToUser({
            currentUserId: profileId,
            targetUserId: userId,
            amount,
        });

        res.status(StatusCodes.OK).send('Deposit succesfull');
    }
};

module.exports = BalancesController;