module.exports = function(schoox){
    return;
}
// /**
//  * Returns a list of academy's users. A role must be specified. Available values are: employee, customer, instructor & member.
//  *
//  * @param {integer}	role			Required, employee, customer, instructor & member
//  * @param {Object}	options			Optional, {past: String, search: String, aboveId: Integer, unitId: Integer, jobId: Integer,
//  *                                  start: Integer, limit: Integer}
//  * @param {Function} callback
//  * @callback		complete
//  * @memberof Schoox
//  * @method listUsers
//  */

//  Schoox.prototype.listUsers = function (options, callback) {
    
//     this._get('users', options, function(error, body) {
//         callback(error, body);
//     });
// }
// /**
//  * Returns a list of enrolled users in a curriculum with a summary of information for every user
//  *
//  * @param {integer}	userId			Required, id of the user
//  * @param {integer}	curriculumId	Required, id of the curriculum
//  * @param {Object}	options			Optional, {external_id: integer}
//  * @callback		complete
//  * @memberof Schoox
//  * @method dashboardGetUsersCurriculumProgress
//  */
// Schoox.prototype.createUser = function (args, callback) {
//     //TODO: Add checks to confirm all relevant information is provided before making call.
//     //TODO: How do I return an error if information isn't provided?
//         // I do this by returning callback(" <field name is missing> missing");
//     required = {
//         firstname: `String`,
//         lastname: `String`,
//         password: `String`,
//         roles: `String`,
//         unit_ids: `Array`,
//         jobs: `String`
//     };
//     this._post('users', args, function(error, body) {
//         callback(error, body);
//     });
// }
// /**
//  * Changes the name and/or the above units of a Unit.
//  *
//  * @param {integer}	unitId			Required, id of the user
//  * @param {Object}	options			Required, {above_ids: [12345, 123456, ...]}
//  * @callback		complete
//  * @memberof Schoox
//  * @method editUnit
//  */
// Schoox.prototype.editUnit = function (args, callback) {
//     //TODO: Add checks to confirm all relevant information is provided before making call.
//     //TODO: How do I return an error if information isn't provided?
//     this._put(`units/${unitId}`, args, function(error, res, body) {
//         callback(error, res, body);
//     });
// }
// /**
//  * Creates multiple Units (maximum of 100) via a single request.
//  *
//  * @param {Object}	options			Required, [ {name: "Name of Unit", above_ids: [12345, 123456, ...]}, ...]
//  * @callback		complete
//  * @memberof Schoox
//  * @method editUnit
//  */
// Schoox.prototype.createBulkUnits = function (args, callback) {
//     //TODO: Add checks to confirm all relevant information is provided before making call.
//     //TODO: How do I return an error if information isn't provided?
//     this._post('units/bulk', args, function(error, body) {
//         callback(error, body);
//     });
// }
// /**
//  * Returns a list of Above Units (max. 100/request) of your Academy.
//  *
//  * @param {Object}	options			Optional
//  * @callback		complete
//  * @memberof Schoox
//  * @method editUnit
//  */
// Schoox.prototype.listAboveUnits = function (args, callback) {
//     this._get('aboves', args, function(error, body) {
//         callback(error, body);
//     });
// }
// /**
//  * Returns a list of Units of your Academy.
//  *
//  * @param {Object}	options			Optional
//  * @callback		complete
//  * @memberof Schoox
//  * @method editUnit
//  */
// Schoox.prototype.listUnits = function (args, callback) {
//     this._get('units', args, function(error, body) {
//         callback(error, body);
//     });
// }

// /**
//  * Returns a list of Jobs in your Academy.
//  *
//  * @param {Object}	args			Optional
//  * @callback		complete
//  * @memberof Schoox
//  * @method editUnit
//  */
// Schoox.prototype.listJobs = function (args, callback) {
//     this._get('jobs', args, function(error, body) {
//         callback(error, body);
//     });
// }
// /**
//  * Adds Units to a given User by an array of Unit Ids.
//  *
//  * @param {Integer} userId			ID of the user you want to add units to
//  * @param {Array} 	units			Array of IDs you want added to the User
//  * @param {Object}	options			Optional
//  * @callback		complete
//  * @memberof Schoox
//  * @method editUnit
//  */
// Schoox.prototype.addUnitsToUser = function (args, callback) {
//     if (args.userId) {
//         var userId = args.userId;
//         delete args.userId;
//     }
//     if(args.external_id) {
//         var external_id = args.external_id;
//         delete args.external_id;
//     }

//     this._put(`users/${userId}/units`, args.data, function(error, res, body) {
//         callback(error, res, body);
//     });
// }
// /**
//  * Adds Above Units to a given User by an array of Unit Ids.
//  *
//  * @param {Object}  args			userId = User ID of the user. data = array of above units to add.
//  * @param {Array} 	aboveUnits		Array of IDs you want added to the User
//  * @param {Object}	options			Optional
//  * @callback		complete
//  * @memberof Schoox
//  * @method editUnit
//  */
// Schoox.prototype.addAboveUnitsToUser = function (args, body, callback) {
//     if (args.userId) {
//         var userId = args.userId;
//         delete args.userId;
//     }
//     this._put(`users/${userId}/aboves`, args, body, function(error, res, body) {
//         callback(error, res, body);
//     });
// }
// /**
//  * Edit the jobs of a given user by an array of units/above units & their job Ids.
//  * User must be previously assigned to the specified units & above units.
//  *
//  * @param {Array} 	data			ID of the user you want to add units to
//  * @param {Object}	options			Optional
//  * @callback		complete
//  * @memberof Schoox
//  * @method editUnit
//  */
// Schoox.prototype.updateUsersJobs = function (args, body, callback) {
//     if (args.userId) {
//         var userId = args.userId;
//         delete args.userId;
//     }

//     this._put(`users/${userId}/jobs`, args, body, function(error, res, body) {
//         callback(error, res, body);
//     });
// }

// /**
//  * Deletes a specific Unit.
//  * 
//  * @param {integer}	userId			Required, id of the user
//  * @param {integer}	curriculumId	Required, id of the curriculum
//  * @param {Object}	options			Optional, {external_id: integer}
//  * @callback		complete
//  * @memberof Schoox
//  * @method dashboardGetUsersCurriculumProgress
//  */

//  Schoox.prototype.deleteUnit = function (args, callback) {
//     if(args.unitId) {
//         var userId = args.userId;
//         delete args.userId;        
//     }

//     this._delete(`units/${userId}`, function(error, body) {
//         callback(error, body);
//     });
//  }