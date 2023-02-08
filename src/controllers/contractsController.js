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

        const contract = await this.contractsService.findContract({
            contractId,
            profileId,
        });

        res.json(contract);
    }
}

module.exports = ContractsController;