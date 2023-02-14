const { StatusCodes } = require('http-status-codes');

const IdValidator = require('./validators/id-validator');


const DECIMAL_RADIX = 10;

class JobsController {
    constructor({
        jobsService,
    }) {
        this.jobsService = jobsService;
    }

    getUnpaidJobs = async (req, res) => {
        const { id: profileId } = req.profile;

        const usersUnpaidActiveJobs = 
            await this.jobsService.getUsersUnpaidActiveJobs({
                userId: profileId,
            });

        res.status(StatusCodes.OK).json(usersUnpaidActiveJobs);
    }

    pay = async (req, res) => {
        const { id: profileId } = req.profile;
        const jobId = parseInt(req.params.jobId, DECIMAL_RADIX);

        IdValidator.validate(jobId);

        await this.jobsService.pay({
            userId: profileId,
            jobId,
        });

        res.status(StatusCodes.OK).send('Payment succesfull');
    }
}

module.exports = JobsController;