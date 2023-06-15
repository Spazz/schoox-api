var Schoox = require('../schoox.js');
var extend = require('xtend');

//#region GET /usage
/**
 * Returns the remaining calls according to your plan.
 * @callback		complete
 * @memberof        Schoox
 * @method          dashboardGetUsers
 */

 Schoox.prototype.getUsage = function (callback) {

	this._get('/usage', options, function (error, body) {
		callback(error, body);
	});
};
//#endregion