class MoneyService {
    constructor({
        dataModels,
    }) {
        this.dataModels = dataModels;
    }

    depositToUser = async (criteria) => {
        const {
            userId,
            amount
        } = criteria;

        const profile = await this.dataModels.profile.findOne({
            where: {
                id: userId,
            }
        });
        if (!profile) {
            //TODO custom error
            throw new Error('User not found')
        }

        try {
            await this.dataModels.profile.increment({
                balance: amount
            }, {
                where: {
                    id: userId,
                }
            });
        } catch (error) {
            //TODO custom error
            throw new Error(`Database operation failed. ${error.message}`)
        }
    }

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

        try {
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
        } catch (error) {
            //TODO custom sequelize error
            console.error(error)
            throw new Error(`Database operation failed. ${error.message}`)
        }
    }
};

module.exports = MoneyService;