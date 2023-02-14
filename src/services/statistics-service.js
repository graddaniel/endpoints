const { QueryTypes } = require('sequelize');
const BusinessDomainError = require('./errors/business-domain-error');


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
        if (new Date(startDate) >= new Date(endDate)) {
            throw new BusinessDomainError(
                'Start date should be earlier than end date'
            );
        }

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
        if (new Date(startDate) >= new Date(endDate)) {
            throw new BusinessDomainError(
                'Start date should be earlier than end date'
            );
        }

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