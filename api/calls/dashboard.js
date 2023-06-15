var Schoox = require('../schoox.js');
var extend = require('xtend');

//#region dashboard/users
/**
 * Show All Users.
 * This method returns all users. Limited to 1000 users.
 * @param {string}	role		Required, this is the role of the user making the call
 * @param {Object}	optionals	Optional, { userId: Integer, external_id: String, aboveId: Integer, jobId: Integer, start: Integer, limit: 100, sort: String }
 * @callback		complete
 * @memberof Schoox
 * @method dashboardGetUsers
 */

Schoox.prototype.dashboardGetUsers = function (role, optionals, callback) {
	
	var options = {
		role: role
	};

	options = extend(options, optionals);

	this._get('dashboard/users', options, function (error, body) {
		callback(error, body);
	});
};
//endregion