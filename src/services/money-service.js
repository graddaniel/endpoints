const { QueryTypes } = require('sequelize');


class MoneyService {
    constructor({
        dataModels,
        sequelize,
    }) {
        this.dataModels = dataModels;
        this.sequelize = sequelize;
    }

    depositToUser = async (criteria) => {
        const {
            currentUserId,
            targetUserId,
            amount,
        } = criteria;

        if (currentUserId !== targetUserId) {
            //TODO custom error
            throw new Error('Cannot deposit to another account');
        }

        const selectUnpaidJobsValueQuery = ` \
SELECT SUM(price) as unpaidJobsValue \
FROM jobs j \
JOIN contracts c \
ON j.contractId = c.id \
WHERE c.clientId = :targetUserId \
AND j.paid IS NULL \
`;

        const unpaidJobsValueQueryResult = await this.sequelize.query(
            selectUnpaidJobsValueQuery, {
                type: QueryTypes.SELECT,
                raw: true,
                replacements: {
                    targetUserId,
                },
            }
        );

        const unpaidJobsValue = unpaidJobsValueQueryResult[0].unpaidJobsValue;
        if (amount > unpaidJobsValue * 25/100) {
            //TODO custom error
            throw new Error('Cannot deposit more than 25% of all unpaid jobs value');
        }

        await this.dataModels.profile.increment({
            balance: amount
        }, {
            where: {
                id: targetUserId,
            }
        });
    }

    //TODO if transaction argument is missing, create it here to make sure whole the function is atomi
    transfer = async (criteria, transaction) => {
        const {
            fromId,
            toId,
            amount,
        } = criteria;

        const issuer = await this.dataModels.profile.findOne({
            id: fromId,
        }, {
            transaction,
        });
        if (!issuer) {
            //TODO custom error
            throw new Error('User not found')
        }

        if (issuer.balance < amount) {
            //TODO custom error
            throw new Error('Insufficient funds');
        }

        await this.dataModels.profile.decrement({
            balance: amount
        }, {
            where: {
                id: fromId,
            },
            transaction,
        });

        await this.dataModels.profile.increment({
            balance: amount
        }, {
            where: {
                id: toId,
            },
            transaction,
        });
    }
};

module.exports = MoneyService;