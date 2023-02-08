
const { StatusCodes } = require('http-status-codes');


async function getProfile (req, res, next) {
    //TODO replace this with ProfileService call
    const { profile: profileModel } = req.app.get('models');

    const profileId = req.get('profile_id');
    if (!profileId) {
        return res.status(StatusCodes.UNAUTHORIZED).send('Missing profile_id header');
    }

    const profile = await profileModel.findOne({
        where: {
            id: profileId,
        },
    });
    if (!profile) {
        return res.status(StatusCodes.UNAUTHORIZED).send('Profile not found');
    }

    req.profile = profile;

    next();
};

module.exports = {
    getProfile,
};