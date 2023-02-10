// TODO Dont couple this class with persistance layer
const { Op } = require('sequelize');

class ContractsService {
    constructor({
        dataModels,
    }) {
        this.dataModels = dataModels;
    }

    findContract = async (criteria) => {
        const {
            contractId,
            profileId,
        } = criteria;

        const contract = await this.dataModels.contract.findOne({
            where: { id: contractId },
        });

        if (!contract) {
            //TODO custom error
            throw new Error('Contract not found');
        }

        if (contract.clientId !== profileId && contract.contractorId !== profileId) {
            //TODO custom error
            throw new Error(`You're not allowed to access this contract`);
        }

        return contract;
    }

    //TODO add limit
    getAllUsersContracts = async ({
        userId,
    }) => {
        const allUsersContracts = await this.dataModels.contract.findAll({
            where: {
                [Op.or]: [{
                    clientId: userId,
                }, {
                    contractorId: userId,
                }],
            },
        });

        return allUsersContracts;
    }
}

module.exports = ContractsService;