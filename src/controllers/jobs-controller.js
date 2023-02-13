const { StatusCodes } = require('http-status-codes');


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

        await this.jobsService.pay({
            userId: profileId,
            jobId,
        });

        res.status(StatusCodes.OK).send('Payment succesfull');
    }
}

module.exports = JobsController;