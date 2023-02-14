const { StatusCodes } = require('http-status-codes');

const IdValidator = require('./validators/id-validator');


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
        const { jobId } = req.params;

        IdValidator.validate(jobId);

        await this.jobsService.pay({
            userId: profileId,
            jobId,
        });

        res.status(StatusCodes.OK).send('Payment succesfull');
    }
}

module.exports = JobsController;