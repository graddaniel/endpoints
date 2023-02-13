const { QueryTypes } = require('sequelize');


class StatisticsService {
    constructor({
        sequelize,
    }) {
        this.sequelize = sequelize;
    }

    getBestPaidContractors = async ({
        startDate,
        endDate,
    }) => {
        const bestPaidContractors = `\
SELECT firstName || ' ' || lastName as fullName \
FROM PROFILES \
WHERE id IN (
    SELECT c.contractorId as total_earnings FROM jobs j \
    LEFT JOIN contracts c \
    ON  j.contractId = c.id \
    WHERE j.paymentDate BETWEEN :startDate AND :endDate \
    GROUP BY c.contractorId \
    ORDER BY sum(j.price) DESC \
)`;
        
        return this.sequelize.query(
            bestPaidContractors, {
                type: QueryTypes.SELECT,
                raw: true,
                replacements: {
                    startDate,
                    endDate,
                },
            }
        );
    }

    getBestPayingClients = async ({
        startDate,
        endDate,
        limit,
    }) => {
        // get all jobs where paymentDate fits the dates
        // join with contracts
        // group by clientId
        // sum jobs prices and sort descending
        // return clientId
        // use as entry to select from profiles where id in returned clientId
    }
}

module.exports = StatisticsService;