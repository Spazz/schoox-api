const extend	= require('xtend');
//const helper	= require('./helper.js');
const Schoox	= require('./schoox.js');


/**
 * Get Details of a User.
 * Returns data for a specific user like first and last name, email, role, region, location, job code and his/her current status in the academy.
 * @param {Number} userId		User's ID
 * @param {Boolean}	external_id	(Optional) True if userId is external id
 * @memberof Schoox
 * @method getUserDetails
 */

Schoox.prototype.getUserDetails = function (userId, external_id, callback) {
	
	const options = {
		external_id: external_id
	};

	this._get('users/' + userId, options, function (error, body) {
		callback(error, body);
	});
};


/**
 * Returns a list of all courses a user is enrolled in with a summary of their total training by course
 * 
 * @param {integer}	userid		Required, this is the role of the users you would like to return
 * @param {Object}	options		{ external_id: String (true/false) }
 * @callback		complete
 * @memberof Schoox
 * @method dashboardGetUsersCourses
 */

Schoox.prototype.dashboardGetUsersCourses = function (userId, options, callback) {

	this._get('dashboard/users/'+userId+'/courses', options, function (error, body) {
		callback(error, body);
	});
};

/**
 * Returns a list of all curriculums a user is enrolled in with a summary of their total training by curriculum
 * 
 * @param {integer}	userid		Required, this is the role of the users you would like to return
 * @param {Object}	options		{ external_id: String (true/false) }
 * @callback		complete
 * @memberof Schoox
 * @method dashboardGetUsersCurriculums
 */

Schoox.prototype.dashboardGetUsersCurriculums = function (userId, options, callback) {

	this._get('dashboard/users/'+userId+'/curriculums', options, function (error, body) {
		callback(error, body);
	});
};

/**
 * Returns a list of all exams a user has taken with information about their performance on every exam
 * 
 * @param {integer}	userid		Required, this is the role of the users you would like to return
 * @param {Object}	options		{ external_id: String (true/false) }
 * @callback		complete
 * @memberof Schoox
 * @method dashboardGetUsersExams
 */

Schoox.prototype.dashboardGetUsersExams = function (userId, options, callback) {

	this._get('dashboard/users/'+userId+'/exams', options, function (error, body) {
		callback(error, body);
	});
};

/**
 * Returns a list of all courses with title, short description and image.
 * 
 * @param {string}	role		Required, this is the role of the user making the call
 * @callback		complete
 * @memberof Schoox
 * @method dashboardGetCoursesList
 */

Schoox.prototype.dashboardGetCoursesList = function (role, callback) {

	const options = {
		role: role
	}

	this._get('dashboard/courses', options, function (error, body) {
		callback(error, body);
	});
};

/**
 * Returns a list of enrolled users in a course with a summary of information for every user
 * 
 * @param {integer} courseId	Required, this is the id of the course
 * @param {string}	role		Required, this is the role of the user making the call
 * @param {Object}	optionals	Optional, {regionId: Integer, locationId: Integer, jobId: Integer, letter: <lastname's starting letter>, start: Integer, limit: Integer up to 1000, sort: String <firstname>}
 * @callback		complete
 * @memberof Schoox
 * @method dashboardGetCoursesEnrolledUsers
 */

Schoox.prototype.dashboardGetCoursesEnrolledUsers = function (courseId, role, optionals, callback) {

	const options = {
		role: role
	}

	options = extend(options, optionals);

	this._get('dashboard/courses/'+courseId, options, function (error, body) {
		callback(error, body);
	});
};

/**
 * Returns detailed information about a user's progress on a course for every single lecture and exam in the course
 * 
 * @param {integer} courseId	Required, this is the id of the course
 * @param {integer} userId      Required, this is the id of the user
 * @param {Object}	options		Optional, {external_id: string <true/false>}
 * @callback		complete
 * @memberof Schoox
 * @method dashboardGetUsersCourseProgress
 */

Schoox.prototype.dashboardGetUsersCourseProgress = function (userId, courseId, options, callback) {

	this._get('dashboard/courses/'+courseId+'/users/'+userId, options, function (error, body) {
		callback(error, body);
	});
};

/**
 * Returns a list of all curriculums with title, short description, image and number of courses.
 * 
 * @param {string}	role		Required, this is the role of the user making the call
 * @callback		complete
 * @memberof Schoox
 * @method dashboardGetCurriculumsList
 */

 Schoox.prototype.dashboardGetCurriculumsList = function (role, callback) {

 	const options = {
 		role: role
 	}

 	this._get('dashboard/curriculums', options, function (error, body) {
 		callback(error, body);
 	});
 };

/**
 * Returns a list of enrolled users in a curriculum with a summary of information for every user
 * 
 * @param {integer}	curriculumId	Required, id of the curriculum
 * @param {string}	role			Required, this is the role of the user making the call
 * @param {Object}	options			Optional, {regionId: integer, locationId: integer, jobId: integer, letter: <starting letter of last name - string>, start: <list starting position - integer, limit: <max size of listed users> - integer, sort: <sorting criteria> - string}
 * @callback		complete
 * @memberof Schoox
 * @method dashboardGetCurriculumsEnrolledUsers
 */

Schoox.prototype.dashboardGetCurriculumsEnrolledUsers = function (curriculumId, role, optionals, callback) {

	const options = {
		role: role
	}

	options = extend(options, optionals)

	this._get('dashboard/curriculums/'+curriculumId, options, function (error, body) {
		callback(error, body);
	});
};

/**
 * Returns a list of enrolled users in a curriculum with a summary of information for every user
 * 
 * @param {integer}	userId			Required, id of the user
 * @param {integer}	curriculumId	Required, id of the curriculum
 * @param {Object}	options			Optional, {external_id: integer}
 * @callback		complete
 * @memberof Schoox
 * @method dashboardGetUsersCurriculumProgress
 */

Schoox.prototype.dashboardGetUsersCurriculumProgress = function (userId, curriculumId, options, callback){

	this._get('dashboard/curriculums/'+curriculumId+'/users/'+userId, options, function (error, body) {
		callback(error, body);
	});
};

Schoox.prototype.dashboardGetExamsList = function (role, callback) {

};

Schoox.prototype.dashboardGetExamsEnrolledUsers = function (examId, role, options, callback) {

};


Schoox.prototype.courseEnrolledUsers = function (courseId, options, callback) {

	this._get('courses/'+courseId+'/students', options, function (error, body) {
		callback(error, body);
	});
};


// ====================================================================================================
// User Calls
// ====================================================================================================

/**
 * Returns a list of academy's users. A role must be specified. Available values are: employee, customer, instructor & member.
 * 
 * @param {integer}	role			Required, employee, customer, instructor & member
 * @param {Object}	options			Optional, {past: String, search: String, aboveId: Integer, unitId: Integer, jobId: Integer, start: Integer, limit: Integer}
 * @param {Function} callback
 * @callback		complete
 * @memberof Schoox
 * @method listUsers
 */

Schoox.prototype.listUsers = function(role, options, callback) {

	const additions = {
		role: role
	}

	options = extend(options, additions);

	this._get('users', options, function(error, body) {
		callback(error, body);
	});

}


/**
 * Returns a list of enrolled users in a curriculum with a summary of information for every user
 * 
 * @param {integer}	userId			Required, id of the user
 * @param {integer}	curriculumId	Required, id of the curriculum
 * @param {Object}	options			Optional, {external_id: integer}
 * @callback		complete
 * @memberof Schoox
 * @method dashboardGetUsersCurriculumProgress
 */

Schoox.prototype.createUser = function(fn, ln, pw, role, email, aboveUnit, unit, job) {
	//TODO: Add checks to confirm all relevant information is provided before making call.
	//TODO: How do I return an error if information isn't provided?

	options = {
		firstname: fn,
		lastname: ln,
		password: pw,
		roles: role, //Must be an array
		unit_ids: aboveUnit, //Must be an array
		jobs: job
	}

	this._post('users', options, function (error, body) {
		callback(error, body);
	});
};

/**
 * Returns a list of enrolled users in a curriculum with a summary of information for every user
 * 
 * @param {integer}	userId			Required, id of the user
 * @param {integer}	curriculumId	Required, id of the curriculum
 * @param {Object}	options			Optional, {external_id: integer}
 * @callback		complete
 * @memberof Schoox
 * @method dashboardGetUsersCurriculumProgress
 */

Schoox.prototype.createUser = function(fn, ln, pw, role, email, aboveUnit, unit, job) {
	//TODO: Add checks to confirm all relevant information is provided before making call.
	//TODO: How do I return an error if information isn't provided?

	options = {
		firstname: fn,
		lastname: ln,
		password: pw,
		roles: role, //Must be an array
		unit_ids: aboveUnit, //Must be an array
		jobs: job
	}



	this._post('users', options, function (error, body) {
		callback(error, body);
	});
};



/**
 * Changes the name and/or the above units of a Unit.
 * 
 * @param {integer}	unitId			Required, id of the user
 * @param {Object}	options			Required, {above_ids: [12345, 123456, ...]}
 * @callback		complete
 * @memberof Schoox
 * @method editUnit
 */

Schoox.prototype.editUnit = function(unitId, options, callback) {
	//TODO: Add checks to confirm all relevant information is provided before making call.
	//TODO: How do I return an error if information isn't provided?

	this._put('units/'+unitId, options, function (error, res, body) {
		callback(error, res, body);
	});
};



/**
 * Creates multiple Units (maximum of 100) via a single request.
 * 
 * @param {Object}	options			Required, [ {name: "Name of Unit", above_ids: [12345, 123456, ...]}, ...]
 * @callback		complete
 * @memberof Schoox
 * @method editUnit
 */

Schoox.prototype.createBulkUnits = function(options, callback) {
	//TODO: Add checks to confirm all relevant information is provided before making call.
	//TODO: How do I return an error if information isn't provided?

	this._post('units/bulk', options, function (error, body) {
		callback(error, body);
	});
};

/**
 * Returns a list of Above Units (max. 100/request) of your Academy.
 * 
 * @param {Object}	options			Optional
 * @callback		complete
 * @memberof Schoox
 * @method editUnit
 */


Schoox.prototype.listAboveUnits = function(options, callback) {
	this._get('aboves', options, function(error, body) {
		callback(error, body);
	});
};

/**
 * Returns a list of Units of your Academy.
 * 
 * @param {Object}	options			Optional
 * @callback		complete
 * @memberof Schoox
 * @method editUnit
 */


Schoox.prototype.listUnits = function(options, callback) {
	this._get('units', options, function(error, body) {
		callback(error, body);
	});
};

/**
 * Adds Units to a given User by an array of Unit Ids.
 * 
 * @param {Integer} userId			ID of the user you want to add units to
 * @param {Array} 	units			Array of IDs you want added to the User	
 * @param {Object}	options			Optional
 * @callback		complete
 * @memberof Schoox
 * @method editUnit
 */


Schoox.prototype.addUnitsToUser = function(userId, units, options, callback) {
	if(!options) {
		options = units;
	}
	
	this._put('users/'+userId+"/units", options, function(error, res, body) {
		callback(error, res, body);
	});
};


/**
 * Adds Above Units to a given User by an array of Unit Ids.
 * 
 * @param {Integer} userId			ID of the user you want to add units to
 * @param {Array} 	aboveUnits		Array of IDs you want added to the User	
 * @param {Object}	options			Optional
 * @callback		complete
 * @memberof Schoox
 * @method editUnit
 */


Schoox.prototype.addAboveUnitsToUser = function(userId, aboveUnits, options, callback) {
	if(!options) {
		options = aboveUnits;
	}

	this._put('users/'+userId+"/aboves", options, function(error, res, body) {
		callback(error, res, body);
	});
};

/**
 * Edit the jobs of a given user by an array of units/above units & their job Ids.
 * User must be previously assigned to the specified units & above units.
 * 
 * @param {Array} 	data			ID of the user you want to add units to	
 * @param {Object}	options			Optional
 * @callback		complete
 * @memberof Schoox
 * @method editUnit
 */


Schoox.prototype.updateUsersJobs = function(data, options, callback) {

	
	
	this._put('users/'+userId+"/units", options, function(error, res, body) {
		callback(error, res, body);
	});
};