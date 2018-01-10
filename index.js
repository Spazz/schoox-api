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

        //Check if parameters is an object. If it is, continue on. If it isn't then return an error.
        if (!(parameters instanceof Object)) {
            return callback("Error: Parameter 1 was not an assocative array");
        }

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
    _put(url, parameters, requestObject, callback) {

        //Check if parameters is an object. If it is, continue on. If it isn't then return an error.
        if (!(parameters instanceof Object)) {
            return callback("Error: Parameter 1 was not an assocative array");
        }

        parameters = extend(parameters, this.creds); // Add credentials to parameters

        var getURL = this.baseURL + '/' + url + '?' + querystring.stringify(parameters); // Construct URL with parameters
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
        var getURL = this.baseURL + '/' + url + '?' + querystring.stringify(this.creds); // Construct URL with parameters
        console.log(`POST: ${getURL}`);

        request.post({
            url: getURL,
            json: true,
            body: requestObject
        }, function(error, response, body) {
            callback(error, response, body || {});
        });
    }

    // ******************************************************************************************************
    // DELETE Helper
    // ******************************************************************************************************
    /**
     * Helper to handle requests to the API with authorization.
     *
     * @private
     * @param {string}    url             	address part after API root
     * @param {Object}    parameters        additional parameters
     * @memberof Schoox
     * @method post
     */
    _delete(url, parameters, callback) {
        var getURL = this.baseURL + '/' + url + '?' + querystring.stringify(this.creds); // Construct URL with parameters
        console.log(`DELETE: ${getURL}`);

        request.delete({
            url: getURL
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
    getUserDetails(args, callback) {
        
        if (args.userId) {
            var userId = args.userId;
            delete args.userId;
        }

        this._get(`users/${userId}`, args, function(error, body) {
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
    dashboardGetUsersCourses(args, callback) {
        if (args.userId) {
            var userId = args.userId;
            delete args.userId;
        }

        this._get(`dashboard/users/${userId}/courses`, args, function(error, body) {
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
    dashboardGetUsersCurriculums(args, callback) {
        if (args.userId) {
            var userId = args.userId;
            delete args.userId;
        }

        this._get(`dashboard/users/${userId}/curriculums`, args, function(error, body) {
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
    dashboardGetUsersExams(args, callback) {
        if (args.userId) {
            var userId = args.userId;
            delete args.userId;
        }
        
        this._get(`dashboard/users/${userId}/exams`, args, function(error, body) {
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
    dashboardGetCoursesList(args, callback) {
        this._get('dashboard/courses', args, function(error, body) {
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
    dashboardGetCoursesEnrolledUsers(args, callback) {
        if (args.courseId) {
            var courseId = args.courseId;
            delete args.courseId;
        }
        this._get(`dashboard/courses/${courseId}`, args, function(error, body) {
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
    dashboardGetUsersCourseProgress(args, callback) {
        if (args.courseId) {
            var courseId = args.courseId;
            delete args.courseId;
        }
        if (args.userId) {
            var userId = args.userId;
            delete args.userId;
        }

        this._get(`dashboard/courses/${courseId}/users/${userId}`, args, function(error, body) {
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
    dashboardGetCurriculumsList(args, callback) {
        this._get('dashboard/curriculums', args, function(error, body) {
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
    dashboardGetCurriculumsEnrolledUsers(args, callback) {
        if (args.curriculumId) {
            var curriculumId = args.curriculumId;
            //delete args.curriculumId;
        }

        this._get(`dashboard/curriculums/${curriculumId}`, args, function(error, body) {
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
    dashboardGetUsersCurriculumProgress(args, callback) {
        if (args.curriculumId) {
            var curriculumId = args.curriculumId;
            delete args.curriculumId;
        }
        if (args.userId) {
            var userId = args.userId;
            delete args.userId;
        }

        this._get(`dashboard/curriculums/${curriculumId}/users/${userId}`, args, function(error, body) {
            callback(error, body);
        });
    }
    dashboardGetExamsList(args, callback) {
    }
    dashboardGetExamsEnrolledUsers(args, callback) {
    }
    courseEnrolledUsers(args, callback) {
        if (args.courseId) {
            var courseId = args.courseId;
            delete args.courseId;
        }

        this._get(`courses/${courseId}/students`, args, function(error, body) {
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
    listUsers(args, callback) {
        this._get('users', args, function(error, body) {
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
    createUser(args, callback) {
        //TODO: Add checks to confirm all relevant information is provided before making call.
        //TODO: How do I return an error if information isn't provided?
            // I do this by returning callback(" <field name is missing> missing");
        required = {
            firstname: `String`,
            lastname: `String`,
            password: `String`,
            roles: `String`,
            unit_ids: `Array`,
            jobs: `String`
        };
        this._post('users', args, function(error, body) {
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
    editUnit(args, callback) {
        //TODO: Add checks to confirm all relevant information is provided before making call.
        //TODO: How do I return an error if information isn't provided?
        this._put(`units/${unitId}`, args, function(error, res, body) {
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
    createBulkUnits(args, callback) {
        //TODO: Add checks to confirm all relevant information is provided before making call.
        //TODO: How do I return an error if information isn't provided?
        this._post('units/bulk', args, function(error, body) {
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
    listAboveUnits(args, callback) {
        this._get('aboves', args, function(error, body) {
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
    listUnits(args, callback) {
        this._get('units', args, function(error, body) {
            callback(error, body);
        });
    }

    /**
     * Returns a list of Jobs in your Academy.
     *
     * @param {Object}	args			Optional
     * @callback		complete
     * @memberof Schoox
     * @method editUnit
     */
    listJobs(args, callback) {
        this._get('jobs', args, function(error, body) {
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
    addUnitsToUser(args, callback) {
        if (args.userId) {
            var userId = args.userId;
            delete args.userId;
        }
        if(args.external_id) {
            var external_id = args.external_id;
            delete args.external_id;
        }

        this._put(`users/${userId}/units`, args.data, function(error, res, body) {
            callback(error, res, body);
        });
    }
    /**
     * Adds Above Units to a given User by an array of Unit Ids.
     *
     * @param {Object}  args			userId = User ID of the user. data = array of above units to add.
     * @param {Array} 	aboveUnits		Array of IDs you want added to the User
     * @param {Object}	options			Optional
     * @callback		complete
     * @memberof Schoox
     * @method editUnit
     */
    addAboveUnitsToUser(args, body, callback) {
        if (args.userId) {
            var userId = args.userId;
            delete args.userId;
        }
        this._put(`users/${userId}/aboves`, args, body, function(error, res, body) {
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
    updateUsersJobs(args, body, callback) {
        if (args.userId) {
            var userId = args.userId;
            delete args.userId;
        }

        this._put(`users/${userId}/jobs`, args, body, function(error, res, body) {
            callback(error, res, body);
        });
	}
	
	/**
	 * Deletes a specific Unit.
	 * 
	 * @param {integer}	userId			Required, id of the user
	 * @param {integer}	curriculumId	Required, id of the curriculum
	 * @param {Object}	options			Optional, {external_id: integer}
	 * @callback		complete
	 * @memberof Schoox
	 * @method dashboardGetUsersCurriculumProgress
	 */

     deleteUnit(args, callback) {
        if(args.unitId) {
            var userId = args.userId;
            delete args.userId;        
        }

        this._delete(`units/${userId}`, function(error, body) {
            callback(error, body);
        });
     }
}


module.exports = Schoox;