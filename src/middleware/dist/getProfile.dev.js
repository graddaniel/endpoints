"use strict";

var _require = require('http-status-codes'),
    StatusCodes = _require.StatusCodes;

function getProfile(req, res, next) {
  var _req$app$get, profileModel, profileId, profile;

  return regeneratorRuntime.async(function getProfile$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          //TODO replace this with ProfileService call
          _req$app$get = req.app.get('models'), profileModel = _req$app$get.profile;
          profileId = req.get('profile_id');

          if (profileId) {
            _context.next = 4;
            break;
          }

          return _context.abrupt("return", res.status(StatusCodes.UNAUTHORIZED).send('Missing profile_id header'));

        case 4:
          _context.next = 6;
          return regeneratorRuntime.awrap(profileModel.findOne({
            where: {
              id: profileId
            }
          }));

        case 6:
          profile = _context.sent;

          if (profile) {
            _context.next = 9;
            break;
          }

          return _context.abrupt("return", res.status(StatusCodes.UNAUTHORIZED).send('Profile not found'));

        case 9:
          req.profile = profile;
          next();

        case 11:
        case "end":
          return _context.stop();
      }
    }
  });
}

;
module.exports = {
  getProfile: getProfile
};