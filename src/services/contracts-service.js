// TODO Dont couple this class with persistance layer
const { Op } = require('sequelize');

const NotAllowedError = require('./errors/not-allowed-error');
const ResourceNotFoundError = require('./errors/resource-not-found-error');


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
            throw new ResourceNotFoundError(`Contract not found. contractId: ${contractId}`);
        }

        if (
            contract.clientId !== profileId &&
            contract.contractorId !== profileId
        ) {
            throw new NotAllowedError(`You are not allowed to access this contract. contractId: ${contractId}`);
        }

        return contract;
    }

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