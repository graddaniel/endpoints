const { StatusCodes } = require('http-status-codes');


class JobsController {
    constructor({
        jobsService,
    }) {
        this.jobsService = jobsService;
    }

    pay = async (req, res) => {
        const { id: profileId } = req.profile;
        const { jobId } = req.params;

        await this.jobsService.pay({
            profileId,
            jobId,
        });

        res.status(StatusCodes.OK).send('Payment succesfull');
    }
}

module.exports = JobsController;