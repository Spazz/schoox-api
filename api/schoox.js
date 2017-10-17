const extend = require('xtend');
const request = require('request');
const querystring = require('querystring');

class Schoox {
    /**
     * Create an instance of wrapper.
     * @constructor
     * @param {string|number} acad_id 
     * @param {string} api_key 
     * @param {string} env 
     */
    constructor(acad_id, api_key, env) {
        
        switch (env) {
            case "stage":
                this.baseURL = "https://staging.schoox.com/api/v1";
                break;
            case "prod":
                this.baseURL = "https://api.schoox.com/v1";
            default:
                this.baseURL = "https://api.schoox.com/v1";
        }
        this.creds = {
            acadId: acad_id,
            apikey: api_key
        };
    }
    // ******************************************************************************************************
    // GET Helper
    // ******************************************************************************************************
    /**
     * Helper to handle requests to the API with authorization.
     *
     * @private
     * @param {string}    url             address part after API root
     * @param {Object}    parameters      additional parameters
     * @memberof Schoox
     * @method get
     */
    _get(url, parameters, callback) {
        parameters = extend(parameters, this.creds); // Add credentials to parameters
        var getURL = this.baseURL + '/' + url + '?' + querystring.stringify(parameters); // Construct URL with parameters
        console.log(`GET: ${getURL}`);
        request.get({
            url: getURL,
            strictSSL: true,
            json: true
        }, function(error, response, body) {
            if (response.statusCode != 200) {
                error = new Error("Status was not OK.", response.statusCode);
            }
            callback(error, body || {});
        });
    }
    // ******************************************************************************************************
    // PUT Helper
    // ******************************************************************************************************
    /**
     * Helper to handle requests to the API with authorization.
     *
     * @private
     * @param {string}    url             	address part after API root
     * @param {Object}    requestObject      additional parameters
     * @memberof Schoox
     * @method post
     */
    _put(url, requestObject, callback) {
        var getURL = this.baseURL + '/' + url + '?' + querystring.stringify(this.credentials); // Construct URL with parameters
        console.log(`PUT: ${getURL}`);
        console.log(requestObject);
        request.put({
            url: getURL,
            json: true,
            body: requestObject
        }, function(error, response, body) {
            callback(error, response, body || {});
        });
    }
    // ******************************************************************************************************
    // POST Helper
    // ******************************************************************************************************
    /**
     * Helper to handle requests to the API with authorization.
     *
     * @private
     * @param {string}    url             	address part after API root
     * @param {Object}    requestObject      additional parameters
     * @memberof Schoox
     * @method post
     */
    _post(url, requestObject, callback) {
        var getURL = this.baseURL + '/' + url + '?' + querystring.stringify(this.credentials); // Construct URL with parameters
        console.log(`POST: ${getURL}`);
        console.log(requestObject);
        request.post({
            url: getURL,
            json: true,
            body: requestObject
        }, function(error, response, body) {
            callback(error, response, body || {});
        });
    }
    /**
     * Show All Users.
     * This method returns all users.
     * @param {array}  args        Required, { userId: Integer, external_id: String, aboveId: Integer, jobId: Integer, start: Integer, limit: 100, sort: String }
     * @memberof Schoox
     * @method dashboardGetUsers
     */
    dashboardGetUsers(args, callback) {
        
        if (!(args instanceof Object)) {
            return callback("Error: Parameter 1 was not an assocative array");
        }
        
        this._get('dashboard/users', args, function(error, body) {
            callback(error, body);
        });
    }
    /**
     * Get Details of a User.
     * Returns data for a specific user like first and last name, email, role, region, location, job code and his/her current status in the academy.
     * @param {String}	external_id	Optional, { boolean string (True, False) }
     * @callback		complete
     * @memberof Schoox
     * @method dashboardGetUsers
     */
    getUserDetails(userId, external_id, callback) {
        var options = {
            external_id: external_id
        };
        this._get(`users/${userId}`, options, function(error, body) {
            callback(error, body);
        });
    }
    /**
     * Returns a list of all courses a user is enrolled in with a summary of their total training by course
     *
     * @param {integer}	userid		Required, this is the role of the users you would like to return
     * @param {Object}	options		{ external_id: String (true/false) }
     * @callback		complete
     * @memberof Schoox
     * @method dashboardGetUsersCourses
     */
    dashboardGetUsersCourses(userId, options, callback) {
        this._get(`dashboard/users/${userId}/courses`, options, function(error, body) {
            callback(error, body);
        });
    }
    /**
     * Returns a list of all curriculums a user is enrolled in with a summary of their total training by curriculum
     *
     * @param {integer}	userid		Required, this is the role of the users you would like to return
     * @param {Object}	options		{ external_id: String (true/false) }
     * @callback		complete
     * @memberof Schoox
     * @method dashboardGetUsersCurriculums
     */
    dashboardGetUsersCurriculums(userId, options, callback) {
        this._get(`dashboard/users/${userId}/curriculums`, options, function(error, body) {
            callback(error, body);
        });
    }
    /**
     * Returns a list of all exams a user has taken with information about their performance on every exam
     *
     * @param {integer}	userid		Required, this is the role of the users you would like to return
     * @param {Object}	options		{ external_id: String (true/false) }
     * @callback		complete
     * @memberof Schoox
     * @method dashboardGetUsersExams
     */
    dashboardGetUsersExams(userId, options, callback) {
        this._get(`dashboard/users/${userId}/exams`, options, function(error, body) {
            callback(error, body);
        });
    }
    /**
     * Returns a list of all courses with title, short description and image.
     *
     * @param {string}	role		Required, this is the role of the user making the call
     * @callback		complete
     * @memberof Schoox
     * @method dashboardGetCoursesList
     */
    dashboardGetCoursesList(role, callback) {
        var options = {
            role: role
        };
        this._get('dashboard/courses', options, function(error, body) {
            callback(error, body);
        });
    }
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
    dashboardGetCoursesEnrolledUsers(courseId, role, optionals, callback) {
        var options = {
            role: role
        };
        options = extend(options, optionals);
        this._get(`dashboard/courses/${courseId}`, options, function(error, body) {
            callback(error, body);
        });
    }
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
    dashboardGetUsersCourseProgress(userId, courseId, options, callback) {
        this._get(`dashboard/courses/${courseId}/users/${userId}`, options, function(error, body) {
            callback(error, body);
        });
    }
    /**
     * Returns a list of all curriculums with title, short description, image and number of courses.
     *
     * @param {string}	role		Required, this is the role of the user making the call
     * @callback		complete
     * @memberof Schoox
     * @method dashboardGetCurriculumsList
     */
    dashboardGetCurriculumsList(role, callback) {
        var options = {
            role: role
        };
        this._get('dashboard/curriculums', options, function(error, body) {
            callback(error, body);
        });
    }
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
    dashboardGetCurriculumsEnrolledUsers(curriculumId, role, optionals, callback) {
        var options = {
            role: role
        };
        options = extend(options, optionals);
        this._get(`dashboard/curriculums/${curriculumId}`, options, function(error, body) {
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
    dashboardGetUsersCurriculumProgress(userId, curriculumId, options, callback) {
        this._get(`dashboard/curriculums/${curriculumId}/users/${userId}`, options, function(error, body) {
            callback(error, body);
        });
    }
    dashboardGetExamsList(role, callback) {
    }
    dashboardGetExamsEnrolledUsers(examId, role, options, callback) {
    }
    courseEnrolledUsers(courseId, options, callback) {
        this._get(`courses/${courseId}/students`, options, function(error, body) {
            callback(error, body);
        });
    }
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
    listUsers(role, options, callback) {
        var additions = {
            role: role
        };
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
    createUser(fn, ln, pw, role, email, aboveUnit, unit, job) {
        //TODO: Add checks to confirm all relevant information is provided before making call.
        //TODO: How do I return an error if information isn't provided?
        options = {
            firstname: fn,
            lastname: ln,
            password: pw,
            roles: role,
            unit_ids: aboveUnit,
            jobs: job
        };
        this._post('users', options, function(error, body) {
            callback(error, body);
        });
    }
    /**
     * Changes the name and/or the above units of a Unit.
     *
     * @param {integer}	unitId			Required, id of the user
     * @param {Object}	options			Required, {above_ids: [12345, 123456, ...]}
     * @callback		complete
     * @memberof Schoox
     * @method editUnit
     */
    editUnit(unitId, options, callback) {
        //TODO: Add checks to confirm all relevant information is provided before making call.
        //TODO: How do I return an error if information isn't provided?
        this._put(`units/${unitId}`, options, function(error, res, body) {
            callback(error, res, body);
        });
    }
    /**
     * Creates multiple Units (maximum of 100) via a single request.
     *
     * @param {Object}	options			Required, [ {name: "Name of Unit", above_ids: [12345, 123456, ...]}, ...]
     * @callback		complete
     * @memberof Schoox
     * @method editUnit
     */
    createBulkUnits(options, callback) {
        //TODO: Add checks to confirm all relevant information is provided before making call.
        //TODO: How do I return an error if information isn't provided?
        this._post('units/bulk', options, function(error, body) {
            callback(error, body);
        });
    }
    /**
     * Returns a list of Above Units (max. 100/request) of your Academy.
     *
     * @param {Object}	options			Optional
     * @callback		complete
     * @memberof Schoox
     * @method editUnit
     */
    listAboveUnits(options, callback) {
        this._get('aboves', options, function(error, body) {
            callback(error, body);
        });
    }
    /**
     * Returns a list of Units of your Academy.
     *
     * @param {Object}	options			Optional
     * @callback		complete
     * @memberof Schoox
     * @method editUnit
     */
    listUnits(options, callback) {
        this._get('units', options, function(error, body) {
            callback(error, body);
        });
    }
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
    addUnitsToUser(userId, units, options, callback) {
        if (!options) {
            options = units;
        }
        this._put(`users/${userId}/units`, options, function(error, res, body) {
            callback(error, res, body);
        });
    }
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
    addAboveUnitsToUser(userId, aboveUnits, options, callback) {
        if (!options) {
            options = aboveUnits;
        }
        this._put(`users/${userId}/aboves`, options, function(error, res, body) {
            callback(error, res, body);
        });
    }
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
    updateUsersJobs(data, options, callback) {
        this._put(`users/${userId}/units`, options, function(error, res, body) {
            callback(error, res, body);
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

	createUser(fn, ln, pw, role, email, aboveUnit, unit, job) {
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
}

module.exports = Schoox;