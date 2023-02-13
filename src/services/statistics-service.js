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
        const selectBestPaidContractorsQuery = `\
SELECT firstName || ' ' || lastName as fullName, earnings \
FROM profiles \
JOIN (
    SELECT c.contractorId as id, sum(j.price) as earnings \
    FROM jobs j \
    LEFT JOIN contracts c \
    ON j.contractId = c.id \
    WHERE j.paymentDate BETWEEN :startDate AND :endDate \
    GROUP BY c.contractorId \
    ORDER BY earnings DESC \
) contractors \
ON contractors.id = profiles.id`;
        
        return this.sequelize.query(
            selectBestPaidContractorsQuery, {
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
        const selectBestPayingClientsQuery = `\
SELECT firstName || ' ' || lastName as fullName, payments \
FROM profiles \
JOIN (
    SELECT c.clientId as id, sum(j.price) as payments \
    FROM jobs j \
    LEFT JOIN contracts c \
    ON j.contractId = c.id \
    WHERE j.paymentDate BETWEEN :startDate AND :endDate \
    GROUP BY c.clientId \
    ORDER BY payments DESC \
) clients \
ON clients.id = profiles.id \
LIMIT :limit`;
        
        return this.sequelize.query(
            selectBestPayingClientsQuery, {
                type: QueryTypes.SELECT,
                raw: true,
                replacements: {
                    startDate,
                    endDate,
                    limit,
                },
            }
        );
    }
}

module.exports = StatisticsService;