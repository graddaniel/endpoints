
const { StatusCodes } = require('http-status-codes');


async function getProfile (req, res, next) {
    const { Profile } = req.app.get('models');

    const profileId = req.get('profile_id');
    if (!profileId) {
        return res.status(StatusCodes.UNAUTHORIZED).end();
    }

    const profile = await Profile.findOne({
        where: {
            id: profileId,
        },
    });
    if (!profile) {
        return res.status(StatusCodes.UNAUTHORIZED).end();
    }

    req.profile = profile;

    next();
};

module.exports = {
    getProfile,
};