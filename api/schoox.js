var extend = require('xtend');
var request = require('request');
var querystring = require('querystring');

var prod_URL = "https://api.schoox.com/v1";
var stage_URL = "https://staging.schoox.com/api/v1";

var API_URL = prod_URL;

/**
 * Schoox API Client.
 * @constructor
 * @param {string}    acadId        Your Schoox Academy ID
 * @param {string}    apiKey        Your Schoox API Key
 * @author Brandon Loeffler <brandon_l121@yahoo.com>
 */

var Schoox = function (acad_id, api_key) {
	this.credentials = {
		acadId: acad_id,
		apikey: api_key
	};
};

module.exports = Schoox;

// ******************************************************************************************************
// GET Helper
// ******************************************************************************************************

/**
 * Helper to handle requests to the API with authorization.
 *
 * @private
 * @param {string}    url             address part after API root
 * @param {Object}    parameters      additional parameters
 * @callback          complete
 * @memberof Schoox
 * @method get
 */
Schoox.prototype._get = function (url, parameters, callback) {
	parameters = extend(parameters, this.credentials); // Add credentials to parameters
	var getURL = API_URL + '/' + url + '?' + querystring.stringify(parameters); // Construct URL with parameters

	console.log("Getting URL... " + getURL);

	request.get({
		url: getURL,
		strictSSL: true,
		json: true
	}, function (error, response, body) {
		
		if (response.statusCode != 200) {
			error = new Error("Status was not OK.", response.statusCode);
		}
		callback(error, body || {});
	});
};

// ******************************************************************************************************
// PUT Helper
// ******************************************************************************************************


/**
 * Helper to handle requests to the API with authorization.
 *
 * @private
 * @param {string}    url             	address part after API root
 * @param {Object}    requestObject      additional parameters
 * @callback          complete
 * @memberof Schoox
 * @method post
 */
Schoox.prototype._put = function (url, requestObject, callback) {
	var getURL = API_URL + '/' + url + '?' + querystring.stringify(this.credentials); // Construct URL with parameters

	console.log("Requesting..." + getURL);
	console.log(requestObject);

	request.put({
		url: getURL,
		json: true,
		body: requestObject
	}, function (error, response, body) {
		
		callback(error, response, body || {});
	});
};

// ******************************************************************************************************
// POST Helper
// ******************************************************************************************************


/**
 * Helper to handle requests to the API with authorization.
 *
 * @private
 * @param {string}    url             	address part after API root
 * @param {Object}    requestObject      additional parameters
 * @callback          complete
 * @memberof Schoox
 * @method post
 */
Schoox.prototype._post = function (url, requestObject, callback) {
	var getURL = API_URL + '/' + url + '?' + querystring.stringify(this.credentials); // Construct URL with parameters

	console.log("Requesting..." + getURL);
	console.log(requestObject);

	request.post({
		url: getURL,
		json: true,
		body: requestObject
	}, function (error, response, body) {
		
		callback(error, response, body || {});
	});
};

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

	var options = {
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

	var options = {
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

 	var options = {
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

	var options = {
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

	var additions = {
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

	this._put('units/'+unitId, options, function (error, body) {
		callback(error, body);
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