class JobsService {
    constructor({
        dataModels,
        moneyService,
        contractsService,
        sequelize, //TODO this coupling should be removed by introducing an abstract persistance layer
    }) {
        this.dataModels = dataModels;
        this.moneyService = moneyService;
        this.contractsService = contractsService;
        this.sequelize = sequelize;
    }

    pay = async ({
        profileId,
        jobId,
    }) => {
        //TODO ad ids to jobs
        const job = await this.dataModels.job.findOne({
            where: {
                id: jobId,
            },
        });

        //TODO remove sequelize coupling
        const result = await this.sequelize.transaction(async transaction => {
            const contract = await this.contractsService.findContract({
                profileId,
                contractId: job.contractId,
            }, {
                transaction,
            });

            if (contract.status !== 'in_progress') {
                //TODO custom error
                throw new Error('Failure. This job is a part of an inactive contract.');
            }
    
            await this.moneyService.transfer({
                fromId: contract.clientId,
                toId: contract.contractorId,
                amount: job.price,
            }, transaction);
    
            await this.dataModels.job.update({
                paid: true,
                paymentDate: Date.now(),
            }, {
                where: {
                    id: job.id,
                },
                transaction,
            });
        });

        console.log(result);
    }
}

module.exports = JobsService;