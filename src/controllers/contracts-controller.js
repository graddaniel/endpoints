const { StatusCodes } = require('http-status-codes');

const IdValidator = require('./validators/id-validator');


const DECIMAL_RADIX = 10;

class ContractsController {
    constructor({
        contractsService
    }) {
        this.contractsService = contractsService;
    }

    getContract = async (req, res) => {
        const contractId = parseInt(req.params.id, DECIMAL_RADIX);
        const { id: profileId } = req.profile;

        IdValidator.validate(contractId);

        const contract = await this.contractsService.findContract({
            contractId,
            profileId,
        });

        res.status(StatusCodes.OK).json(contract);
    }

    getAllContracts = async (req, res) => {
        const { id: profileId } = req.profile;

        const allUsersContracts = await this.contractsService.getAllUsersContracts({
            userId: profileId,
        });

        res.status(StatusCodes.OK).json(allUsersContracts);
    }
}

module.exports = ContractsController;