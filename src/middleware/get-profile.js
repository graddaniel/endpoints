
const IdValidator = require('../controllers/validators/id-validator');
const MissingParametersError = require('../services/errors/missing-parameters-error');
const ResourceNotFoundError = require('../services/errors/resource-not-found-error');


const DECIMAL_RADIX = 10;

async function getProfile (req, res, next) {
    try {
        const { profile: profileModel } = req.app.get('models');

        const profileIdParameter = req.get('profile_id');
        if (!profileIdParameter) {
            throw new MissingParametersError('Missing profile_id header');
        }

        const profileId = parseInt(profileIdParameter, DECIMAL_RADIX);

        IdValidator.validate(profileId);
    
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
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getProfile,
};