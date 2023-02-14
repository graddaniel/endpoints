const { QueryTypes } = require('sequelize');

const BusinessDomainError = require('./errors/business-domain-error');
const NotAllowedError = require('./errors/not-allowed-error');
const ResourceNotFoundError = require('./errors/resource-not-found-error');

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
            throw new NotAllowedError('Not allowed to deposit to another account');
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
            throw new BusinessDomainError('Cannot deposit more than 25% of all unpaid jobs value');
        }

        await this.dataModels.profile.increment({
            balance: amount
        }, {
            where: {
                id: targetUserId,
            }
        });
    }

    transfer = (criteria, transaction) => {
        if (!transaction) {
            return this.sequelize.transaction(
                async newTransaction => await this._transfer(criteria, newTransaction)
            );
        }

        return this._transfer(criteria, transaction);
    }

    _transfer = async (criteria, transaction) => {
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
            throw new ResourceNotFoundError(`User not found. userId: ${fromId}`);
        }

        if (issuer.balance < amount) {
            throw new BusinessDomainError('Insufficient funds');
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