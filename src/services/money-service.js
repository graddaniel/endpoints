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

        const result = await this.dataModels.profile.increment({
            balance: amount
        }, {
            where: {
                id: userId,
            }
        });

        const updateSuccesfull = result[0][1];
        if (!updateSuccesfull) {
            //TODO custom error
            throw new Error(`Failed to deposit money to the User`);
        }

        console.log(result)
    }
};

module.exports = MoneyService;