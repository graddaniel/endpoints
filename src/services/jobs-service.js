const { QueryTypes } = require('sequelize');
const BusinessDomainError = require('./errors/business-domain-error');
const ResourceNotFoundError = require('./errors/resource-not-found-error');


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
        userId,
        jobId,
    }) => {
        const job = await this.dataModels.job.findOne({
            where: {
                id: jobId,
            },
        });

        if (!job) {
            throw new ResourceNotFoundError('Job not found');
        }

        if (job.paid) {
            throw new BusinessDomainError('Job is already paid');
        }

        //TODO remove sequelize coupling
        const result = await this.sequelize.transaction(async transaction => {
            const contract = await this.contractsService.findContract({
                profileId: userId,
                contractId: job.contractId,
            }, {
                transaction,
            });

            if (contract.status !== 'in_progress') {
                throw new BusinessDomainError('This job is a part of an inactive contract.');
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

    getUsersUnpaidActiveJobs = ({
        userId,
    }) => {
        const unpaidActiveJobsQuery = `\
SELECT * FROM jobs j \
LEFT JOIN contracts c \
ON  j.contractId = c.id \
WHERE c.status = 'in_progress' \
AND (c.contractorId = :userId OR c.clientId = :userId) \
`;

        return this.sequelize.query(
            unpaidActiveJobsQuery, {
                type: QueryTypes.SELECT,
                raw: true,
                replacements: {
                    userId,
                },
            }
        );
    }
}

module.exports = JobsService;