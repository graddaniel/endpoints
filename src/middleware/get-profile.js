
const MissingParametersError = require('../services/errors/missing-parameters-error');
const ResourceNotFoundError = require('../services/errors/resource-not-found-error');


async function getProfile (req, res, next) {
    const { profile: profileModel } = req.app.get('models');

    const profileId = req.get('profile_id');
    if (!profileId) {
        throw new MissingParametersError('Missing profile_id header');
    }

    const profile = await profileModel.findOne({
        where: {
            id: profileId,
        },
    });
    if (!profile) {
        throw new ResourceNotFoundError('Profile not found');
    }

    req.profile = profile;

    next();
};

module.exports = {
    getProfile,
};