const { StatusCodes } = require('http-status-codes');


const DEFAULT_RESULTS_COUNT = 2;
const DECIMAL_RADIX = 10;

class AdminController {
    constructor({
        statisticsService,
    }) {
        this.statisticsService = statisticsService;
    }

    getBestProfession = async (req, res) => {
        const searchParams = new URLSearchParams(req.query);

        const startDate = searchParams.get('start');
        const endDate = searchParams.get('end');

        const bestProfessionList = await this.statisticsService.getBestPaidContractors({
            startDate,
            endDate,
        });

        res.status(StatusCodes.OK).json(bestProfessionList);
    }
    
    getBestClients = async (req, res) => {
        const searchParams = new URLSearchParams(req.query);

        const startDate = searchParams.get('start');
        const endDate = searchParams.get('end');
        const limitParam = searchParams.get('limit');

        const limit = limitParam === null
            ? DEFAULT_RESULTS_COUNT
            : parseInt(limitParam, DECIMAL_RADIX);

        const bestClientsList = await this.statisticsService.getBestPayingClients({
            startDate,
            endDate,
            limit,
        });

        res.status(StatusCodes.OK).json(bestClientsList);
    }
}

module.exports = AdminController;