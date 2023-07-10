var extend = require('xtend');

module.exports = function (schoox) {
	return {
		//#region GET /users

		/**
		 * Retrieves a list of academy users based on the specified role.
		 *
		 * @param {Object}     options                      Optional parameters.
		 * @param {string}     [options.role=employee]      Role of the users. Available values are: "employee", "customer", "instructor", and "member". Defaulted to employee
		 * @param {boolean}    [options.past]               Specify as "true" to list past employees if the given role is "employee". Default value is "false".
		 * @param {string}     [options.search]             Search by user's firstname or lastname.
		 * @param {number}     [options.aboveId]            Above Unit's ID.
		 * @param {number}     [options.unitId]             Unit's ID.
		 * @param {number}     [options.jobId]              Job's ID.
		 * @param {number}     [options.start]              Starting position.
		 * @param {number}     [options.limit]              Number of users to return per request, up to a maximum of 100. Default value is 100.
		 * @param {Function}   callback                     Callback function to handle the response.
		 * @param {string}     callback.error               Error message if any.
		 * @param {Object}     callback.body                Response body containing the list of users.
		 *
		 */

		getUsers: function (options, callback) {
			const req = {
				role: options.role || 'employee',
				past: options.past,
				search: options.search,
				aboveId: options.aboveId,
				unitId: options.unitId,
				jobId: options.jobId,
				start: options.start,
				limit: options.limit,
			};

			schoox._get('users', req, function (error, body) {
				callback(error, body);
			});
		},
		//#endregion

		//#region GET /users/:userid

		/**
		 * Retrieves details of a specific user.
		 *
		 * @param {string}     userid                       The ID of the user.
		 * @param {Object}     options                      Optional parameters.
		 * @param {string}     [options.external_id=false]  Sets whether the ID given is the external_id of the user. By default, the value is "false".
		 * @param {Function}   callback                     Callback function to handle the response.
		 * @param {string}     callback.error               Error message if any.
		 * @param {Object}     callback.body                Response body containing the details of the user.
		 *
		 */
		getUserDetails: function (userid, options, callback) {
			const req = {
				external_id: options.external_id || 'false',
			};

			schoox._get(`users/${userid}`, req, function (error, body) {
				callback(error, body);
			});
		},
		//#endregion

		//#region GET /users/:userid/badges
		/**
		 * Returns a list of user's academy badges.
		 *
		 * @param {string}     userid                       The ID of the user.
		 * @param {Object}     options                      Optional parameters.
		 * @param {string}     [options.external_id]  		Sets whether the ID given is the external_id of the user. By default, the value is "false".
		 * @param {Function}   callback                     Callback function to handle the response.
		 * @param {string}     callback.error               Error message if any.
		 * @param {Object}     callback.body                Response body containing the list of badges.
		 *
		 */

		getuserBadges: function (userid, options, callback) {
			const req = {
				external_id: options.external_id,
			};
			schoox._get(`users/${userid}/badges`, req, function (error, body) {
				callback(error, body);
			});
		},
		//#endregion

		//#region POST /users
		/** TODO: Finish the documentation here. Specifically the Jobs section.
		 * Creates and adds a user to the academy. Password is a mandatory field in order to create a user. If it is omitted, the user will be added through an academy invitation. Email, username or an external id are mandatory fields.
		 * Review the API documentation for more information regarding the details of this method.
		 *
		 * @param {Object}	userDetails			          Details of the user to be created.
		 * @param {string}	[userDetails.username]        Username of the user.
		 * @param {string}	[userDetails.firstname]       First name of the user.
		 * @param {string}	[userDetails.middlename]      Middle name of the user.
		 * @param {string}	[userDetails.lastname]        Last name of the user.
		 * @param {string}  [userDetails.password]        Password of the user.
		 * @param {base64}  [userDetails.profile_picture] Base64 encoded profile picture of the user.
		 * @param {boolean} [userDetails.welcomeEmail]    True/False to send welcome email to the user.
		 * @param {array}   [userDetails.roles]           Roles the employee should be added to. Available values are: "employee", "customer", "instructor", and "member"
		 * @param {string}	[userDetails.email]           Email of the user.
		 * @param {array}   [userDetails.external_ids]    External IDs.
		 * @param {array}   [userDetails.above_ids]       Above Unit IDs.
		 * @param {array}   [userDetails.unit_ids]        Unit IDs.
		 * @param {array}   [userDetails.jobs]            Arrays of jobs.
		 * @param {number}	[userDetails.jobs.unit_id]    Unit ID the job is assigned to.
		 * @param {array}	[userDetails.jobs.jobs]       Job IDs
		 * @param {string}	[userDetails.language]        Language of the user. See the official API documentation for available languages.
		 * @param {string}  [userDetails.hired_date]      Format: YYYY-MM-DD.
		 * @param {string}  [userDetails.employee_type]   Employee type of the user.
		 * @param {string}  [userDetails.employee_number] Employee number of the user.
		 * @param {Array}   [userDetails.custom_fields]   Array of custom fields.
		 * @param {Object}	callback					  Callback function to handle the response.
		 * @param {string}	callback.error				  Error message if any.
		 * @param {Object}	callback.body				  Response body containing the details of the created user
		 *
		 */
		createandAddUser: function (userDetails, callback) {
			//TODO: Add checks to confirm all relevant information is provided before making call.
			//TODO: How do I return an error if information isn't provided?
			// I do this by returning callback(" <field name missing> missing");

			//TODO: Add a check to determine if this is a bulk upload or a single upload and then run the appropriate endpoint.
			//TODO: Add additional method, inviteUser, which just makes a call to createUser. Might have to add additional logic here to check for that.

			required = {
				firstname: `String`,
				lastname: `String`,
				password: `String`,
				roles: `String`,
				unit_ids: `Array`,
				jobs: `String`,
			};
			schoox._post('users', userDetails, function (error, body) {
				callback(error, body);
			});
		},
		//#endregion

		//#region PUT /users/:userid
		/**
		 * Edits the details of a specific user.
		 *
		 * @param {string}      userid                         The ID of the user.
		 * @param {Object}      [options]                      Optional parameters
		 * @param {string}      [options.external_id]          Sets whether the ID given is the external_id of the user. By default, the value is "false".
		 * @param {Object}      userData                       Object of all values you want updated on the user.
		 * @param {string}      [userData.username]            Username of the user.
		 * @param {string}      [userData.firstname]           First name of the user.
		 * @param {string}      [userData.middlename]          Middle name of the user.
		 * @param {string}      [userData.lastname]            Last name of the user.
		 * @param {string}      [userData.password]            Password of the user.
		 * @param {string}      [userData.profile_picture]     Base64 encoded profile picture
		 * @param {Function}    callback                       Callback function to handle the response.
		 * @param {string}      callback.error                 Error message if any.
		 * @param {Object}      callback.body                  Response body containing the details of the updated user.
		 *
		 */
		editUser: function (userid, options, userData, callback) {
			const req = {
				external_id: options.external_id,
			};

			schoox._put(`users/${userid}`, req, userData, function (error, body) {
				callback(error, body);
			});
		},
		//#endregion

		//#region DELETE /users/:userid
		/**
		 * Deletes a specific user.
		 *
		 * @param {string}      userid                         The ID of the user.
		 * @param {Object}      [options]                      Optional parameters.
		 * @param {string}      [options.external_id]          Sets whether the ID given is the external.
		 * @param {Function}    callback                       Callback function to handle the response.
		 * @param {string}      callback.error                 Error message if any.
		 * @param {Object}      callback.body                  Response body containing the details of the deleted user.
		 *
		 */
		removeUser: function (userid, options, callback) {
			const req = {
				external_id: options.external_id,
			};

			schoox._delete(`users/${userid}`, req, function (error, body) {
				callback(error, body);
			});
		},
		//#endregion

		//#region POST /users
		/**
		 * Reactivates a Past Employee as Employee. You can use the User Id or his/her external_id.
		 *
		 * @param {string}    userid                   The ID of the user.
		 * @param {Object}    [options]                Optional parameters.
		 * @param {string}    [options.external_id]    Sets whether the ID given is the external.
		 * @param {Function}  callback                 Callback function to handle the response.
		 * @param {string}    callback.error           Error message if any.
		 * @param {Object}    callback.body            Response body containing the details of the deleted user.
		 *
		 */

		reactivateUser: function (userid, options, callback) {
			if (options.external_id === true) {
				requestObject = {
					external_id: userid,
				};
			} else {
				requestObject = {
					id: userid,
				};
			}

			schoox._post(`users/${userid}`, {}, function (error, body) {
				callback(error, body);
			});
		},
		//#endregion

		//#region POST /jobs
		/**
		 * Creates a new job. You can also use external_id.
		 *
		 * @param {Object}    jobDetails      Details of the job to be created.
		 * @param {Function}  callback        Callback function to handle the response.
		 * @param {string}    callback.error  Error message if any.
		 * @param {Object}    callback.body   Response body containing the details of the created job.
		 *
		 */

		addJob: function (jobDetails, callback) {
			//TODO: Add a check to determine if this is a bulk upload or a single upload and then run the appropriate endpoint.
			// /jobs/bulk to do a bulk upload. Limited to 10 jobs per request.
			const req = {
				name: jobDetails.name,
				report_id: jobDetails.report_id,
				external_id: jobDetails.external_id,
			};

			schoox._post('jobs', req, function (error, body) {
				callback(error, body);
			});
		},
		//#region

		//#region PUT /jobs/:jobid

		/**
		 * Edits a job by changing its name and/or report ID.
		 *
		 * @param {string}     jobId                    The ID of the job.
		 * @param {Object}     requestObj               Request object schema.
		 * @param {Object}     options                  Optional Parameters.
		 * @param {string}     options.external_id      Sets whether the ID given is the external ID of the Job.
		 *                                              By default, the value is "false".
		 * @param {string}     options.title            Sets whether the ID given is the current title of the Job.
		 *                                              By default, the value is "false".
		 * @param {Object}     requestObj
		 * @param {string}     requestObj.name          New name for the job.
		 * @param {Function}   callback                 Callback function to handle the response.
		 * @param {string}     callback.error           Error message if any.
		 * @param {Object}     callback.body            Response body containing the result of the operation.
		 */

		editJob: function (jobId, options, requestObj, callback) {
			const req = {
				external_id: options.external_id,
				title: options.title,
			};

			schoox._put(`jobs/${jobId}`, req, requestObj, function (error, body) {
				callback(error, body);
			});
		},

		//#endregion

		//#region DELETE /jobs/:jobid
		/**
		 * Deletes a specified job. It also removes the job from all assigned users.
		 *
		 * @param {string}      jobid                 The ID of the job to be deleted.
		 * @param {Object}      [options]             Optional parameters.
		 * @param {string}      [options.external_id] Sets whether the ID given is the external.
		 * @param {string}      [options.title]       Sets the title of the job.
		 * @param {Function}    callback              Callback function to handle the response.
		 * @param {string}      callback.error        Error message if any.
		 * @param {Object}      callback.body         Response body containing the details of the deleted job.
		 *
		 */
		deleteJob: function (jobid, options, callback) {
			const req = {
				external_id: options.external_id,
				title: options.title,
			};

			schoox._delete(`jobs/${jobid}`, req, function (error, body) {
				callback(error, body);
			});
		},
		//#endregion

		//#region GET /jobs
		/**
		 * Returns a list of Jobs in your Academy.
		 *
		 * @param {Object}		options 				Optional parameters.
		 * @param {string}		options.search			Search by Job title
		 * @param {number}		options.start			Starting position.
		 * @param {number}		options.limit			Maximum number of jobs to return per request. Default is 100.
		 * @param {Function}	callback				Callback function to handle the response.
		 * @param {string}		callback.error			Error message if any.
		 * @param {Object}		callback.body			Response body containing the list of jobs.
		 *
		 */
		listJobs: function (options, callback) {
			const reqs = {
				search: options.search,
				start: options.start,
				limit: options.limit,
			};

			schoox._get('jobs', reqs, function (error, body) {
				callback(error, body);
			});
		},
		//#endregion

		//#region PUT /users/:userid/roles

		/**
		 * Edit the roles of a given user. Available roles are: admin, training_manager, content_manager, professional_instructor, hourly_worker.
		 *
		 * @param {string}    userid                     Users ID.
		 * @param {Object}    options                    Additional parameters.
		 * @param {string}    [options.external_id]      Sets whether the ID given is the external.
		 * @param {array}     options.roles              Array of roles.
		 * @param {Function}  callback                   Callback function to handle the response.
		 * @param {string}    callback.error             Error message if any.
		 * @param {Object}    callback.body              Response body containing the details of the updated user.
		 *
		 */

		updateUsersRoles: function (userid, options, callback) {
			const options1 = {
				external_id: options.external_id,
			};

			const req = options.roles;

			schoox._put(
				`users/${userid}/roles`,
				options1,
				req,
				function (error, body) {
					callback(error, body);
				}
			);
		},
		//#endregion

		//#region PUT /users/:userid/jobs

		/**
		 * Edit the jobs of a given user by an array of units/above units & their job Ids. User must be previously assigned to the specified units & above units.
		 *
		 * @param {string} 		userid                   	Users id.
		 * @param {object} 		options                  	Additional parameters.
		 * @param {string} 		options.external_id      	Sets whether the ID given is the external.
		 * @param {array}		options.jobs              	Array of jobs and which unit/above unit to attach the job to [{unit: 2002, jobs: 7160}, ...].
		 * @param {Function} 	callback               		Callback function to handle the response.
		 * @param {string} 		callback.error           	Error message if any.
		 * @param {Object} 		callback.body            	Response body containing the details of the updated user.
		 *
		 */

		updateUsersJobs: function (userid, options, callback) {
			const req = {
				external_id: options.external_id,
			};

			const reqObj = options.jobs;

			schoox._put(`users/${userid}/jobs`, req, reqObj, function (error, body) {
				callback(error, body);
			});
		},
		//#endregion

		//#region PUT /users/:userid/units
		/**
		 * Adds Units to a given User by an array of Unit Ids.
		 *
		 * @param {Integer}		userId					ID of the user you want to add units to.
		 * @param {Object} 		options					Optional parameters.
		 * @param {boolean} 	options.external_id		Sets whether the id given is the extenral_id of the User. By default, the value is "false".
		 * @param {boolean} 	options.title			Sets whether the id given are the titles of the Units. By default, the value is "false".
		 * @param {Array} 		options.units			Array of Unit IDs you want added to the User
		 *
		 */
		addUnitsToUser: function (userId, options, callback) {
			const params = {
				external_id: options.external_id,
				title: options.title,
			};

			const reqObj = options.units;

			schoox._put(
				`users/${userId}/units`,
				params,
				reqObj,
				function (error, body) {
					callback(error, body);
				}
			);
		},
		//#endregion

		//#region PUT /units/:unitid
		/**
		 * Changes the name and/or the above units of a Unit.
		 *
		 * @param {integer}		unitId					 	Required, id of the user
		 * @param {Object}		options					 	Required, {above_ids: [12345, 123456, ...]}
		 * @param {boolean}		options.external_id      	Sets whether the Unit ID given is the external ID.
		 * @param {boolean}		options.title             	Sets whether the id given is the current ittle of the Unit.
		 * @param {Object}		options.request           	Request Object. {name: "Austin", above_ids: [12345, 123456,...], external_id: "Austin.TX"}
		 * @param {Function}  	callback                   	Callback function to handle the response.
		 * @param {string}    	callback.error             	Error message if any.
		 * @param {Object}    	callback.body              	Response body containing the details of the updated user.
		 *
		 */
		editUnit: function (unitId, options, callback) {
			const req = {
				external_id: options.external_id,
				title: options.title,
			};

			const reqObj = options.request;

			schoox._put(`units/${unitId}`, req, reqObj, function (error, body) {
				callback(error, body);
			});
		},
		//#endregion

		//#region POST /units/bulk
		/**
		 * Creates multiple Units (maximum of 100) via a single request.
		 *
		 * @param {Object}		options
		 * @param {Object}		options.units			Required, [ {name: "Austin", above_ids: [12345, 123456, ...]}, external_id: "Austin.TX"}, ...]
		 * @param {Function} 	callback				Callback function to handle the response.
		 * @param {string}		callback.error			Error message if any.
		 * @param {Object}		callback.body			Response body containing the details of the created.
		 *
		 */
		createBulkUnits: function (options, callback) {
			//TODO: Delete this once you have rolled it into the original create method.

			const reqObj = options.units;

			schoox._post('units/bulk', {}, reqObj, function (error, body) {
				callback(error, body);
			});
		},
		//#endregion

		//#region GET /aboves
		/**
		 * Returns a list of Above Units (max. 100/request) of your Academy.
		 *
		 * @param {Object}	options			Optional
		 * @callback		complete
		 */
		listAboveUnits: function (args, callback) {
			schoox._get('aboves', args, function (error, body) {
				callback(error, body);
			});
		},
		//#endregion

		//#region GET /units
		/**
		 * Returns a list of Units of your Academy.
		 *
		 * @param {Object}	options			Optional
		 * @callback		complete
		 */
		listUnits: function (args, callback) {
			schoox._get('units', args, function (error, body) {
				callback(error, body);
			});
		},
		//#endregion

		//#region PUT /users/:userid/aboves
		/**
		 * Adds Above Units to a given User by an array of Unit Ids.
		 *
		 * @param {String}  userId          Required, userID of the user you want to update above units on
		 * @param {Array}   aboveUnits      Required, above units you want to add to the user
		 * @param {Object}  options			Optional, {external_id: String, title: String}
		 * @callback		complete
		 * @memberof        Schoox
		 * @method          addAboveUnitstoUser
		 */
		addAboveUnitstoUser: function (userId, aboveUnits, options, callback) {
			schoox._put(
				`users/${userId}/aboves`,
				options,
				aboveUnits,
				function (error, res, body) {
					callback(error, res, body);
				}
			);
		},
		//#endregion

		//#region PUT /users/:userid/jobs
		/**
		 * Edit the jobs of a given user by an array of units/above units & their job Ids.
		 * User must be previously assigned to the specified units & above units.
		 *
		 * @param {String}   userId          Required, ID of the user you want to
		 * @param {Array} 	data			ID of the user you want to add units to
		 * @param {Object}	options			Optional
		 * @callback		    complete
		 * @memberof         Schoox
		 * @method           updateUsersJobs
		 */
		updateUsersJobs: function (userId, body, callback) {
			schoox._put(
				`users/${userId}/jobs`,
				args,
				body,
				function (error, res, body) {
					callback(error, res, body);
				}
			);
		},
		//#endregion

		//#region DEL /units/:userid
		/**
		 * Deletes a specific Unit.
		 *
		 * @param       {integer}	unitId			    Required, id of the unit
		 * @param       {Object}	_options			    Optional settings
		 * @param       {String}    options.title       Sets whether the id given is the current title of the Unit. By default, the value is "false"
		 * @param       {String}    options.external_id Sets whether the id given is the external_id of the Unit. By default, the value is "false"
		 * @callback                callback
		 * @param       {String}    error               Returns any error messages
		 * @param       {JSON}      body                Returns the call body
		 * @memberof Schoox
		 * @method dashboardGetUsersCurriculumProgress
		 */

		deleteUnit: function (unitId, _options, callback) {
			schoox._delete(`units/${unitId}`, function (error, body) {
				callback(error, body);
			});
		},
		//#endregion

		//#region GET /users/:eventid/events
		/**
		 * Checks whether users (max. 10/request) are registered in a future Event.
		 * @param {string}    eventid           Required, ID of the event you want to check.
		 * @param {array}     userIDs           Array of user IDs to check.
		 * @param {Function}  callback          Callback function to handle the response.
		 * @param {string}    callback.error    Error message if any.
		 * @param {Object}    callback.body     Response body containing the result of the operation.
		 */

		getRegisteredUsersFutureEvents: function (eventid, userIDs, callback) {
			const users = {
				userIds: userIDs,
			};

			schoox._get(`users/${eventid}/events`, users, function (error, body) {
				callback(error, body);
			});
		},
		//#endregion
	};
};
