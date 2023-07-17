var extend = require('xtend');

module.exports = function (schoox) {
	return {
		//#region GET /dashboard/users
		/**
		 * Returns a list of current users in your organization with a summary of their training performance.
		 *
		 * @param {String}      [role=employee]         Users' role
		 * @param {Object}      [options]               Optional parameters
		 * @param {String}      [options.external_id]   Sets whether the ID given is the external ID of the User.
		 *                                              By default, the value is "false".
		 * @param {Integer}     [options.aboveId]       Above Unit's ID
		 * @param {Integer}     [options.unitId]        Unit's ID
		 * @param {Integer}     [options.jobId]         Job's ID
		 * @param {String}      [options.search]        Search text
		 * @param {Integer}     [options.start]         List's starting position
		 * @param {Integer}     [options.limit]         Number of users to return per request, up to a maximum of 1,000.
		 *                                              Defaults to 100.
		 * @param {String}      [options.sort]          Sorting criteria
		 * @param {String}      [options.order]         Descending or ascending order
		 * @param {Function}    callback                Callback function to handle the response
		 * @param {String}      callback.error          Error message if any
		 * @param {Array}       callback.body           Response body containing the list of users with training performance summary
		 */

		getUsers: function (role = 'employee', options, callback) {
			const req = {
				role: role,
			};

			options = extend(options, req);

			schoox._get('dashboard/users', options, function (error, body) {
				callback(error, body);
			});
		},
		//#endregion

		//#region GET /dashboard/users/:userid/courses
		/**
		 * Returns a list of all courses a user is enrolled in with a summary of their total training and training information by course.
		 *
		 * @param {String}      userid                  User ID
		 * @param {Object}      [options]               Optional parameters
		 * @param {Integer}     [options.category_id]   Academy category ID
		 * @param {String}      [options.external_id]   Sets whether the ID given is the external ID of the User.
		 *                                              By default, the value is "false".
		 * @param {String}      [options.dropped_out]   Sets whether the courses are dropped out by the user
		 * @param {Function}    callback                Callback function to handle the response
		 * @param {String}      callback.error          Error message if any
		 * @param {Array}       callback.body           Response body containing the list of courses for the user
		 */
		getUserCourses: function (userid, options, callback) {
			schoox._get(
				`dashboard/users/${userid}/courses`,
				options,
				function (error, body) {
					callback(error, body);
				}
			);
		},
		//#endregion

		//#region GET /dashboard/users/:userid/curriculums
		/**
		 * Returns a list of all curriculums a user is enrolled in with a summary of their total training and training information by curriculum.
		 *
		 * @param {String}      userid                  User ID
		 * @param {Object}      [options]               Optional parameters
		 * @param {String}      [options.external_id]   Sets whether the ID given is the external ID of the User.
		 *                                              By default, the value is "false".
		 * @param {Function}    callback                Callback function to handle the response
		 * @param {String}      callback.error          Error message if any
		 * @param {Array}       callback.body           Response body containing the list of curriculums for the user
		 */

		getUserCuriculums: function (userid, options, callback) {
			schoox._get(
				`dashboard/users/${userid}/curriculums`,
				options,
				function (error, body) {
					callback(error, body);
				}
			);
		},
		//#endregion

		//#region GET /dashboard/users/:userid/exams
		/**
		 * Returns a list of all exams a user has taken with information about their performance on each exam.
		 *
		 * @param {String}      userid                  User ID
		 * @param {Object}      [options]               Optional parameters
		 * @param {String}      [options.external_id]   Sets whether the ID given is the external ID of the User.
		 *                                              By default, the value is "false".
		 * @param {Function}    callback                Callback function to handle the response
		 * @param {String}      callback.error          Error message if any
		 * @param {Array}       callback.body           Response body containing the list of exams for the user
		 */

		getUserExams: function (userid, options, callback) {
			schoox._get(
				`dashboard/users/${userid}/exams`,
				options,
				function (error, body) {
					callback(error, body);
				}
			);
		},
		//#endregion

		//#region GET /dashboard/users/:userid/ojts
		/**
		 * Returns a list of all on the job trainings a user has taken, along with information about their performance on each training.
		 *
		 * @param {String}      userid                  User ID
		 * @param {Object}      [options]               Optional parameters
		 * @param {String}      [options.external_id]   Sets whether the ID given is the external ID of the User.
		 *                                              By default, the value is "false".
		 * @param {Integer}     [options.start]         Defines the offset of the on the job trainings listing.
		 * @param {Function}    callback                Callback function to handle the response
		 * @param {String}      callback.error          Error message if any
		 * @param {Object}      callback.body           Response body containing the list of on the job trainings for the user
		 * @param {Boolean}     callback.body.more      Flag indicating if there are more on the job trainings to show
		 */

		getUserOJTS: function (userid, options, callback) {
			schoox._get(
				`dashboard/users/${userid}/ojts`,
				options,
				function (error, body) {
					callback(error, body);
				}
			);
		},
		//#endregion

		//#region GET /dashboard/users/:userid/summary
		/**
		 * Retrieves the dashboard summary information for a specific user.
		 *
		 * @param {String}      userid                  User ID
		 * @param {Object}      [options]               Optional parameters
		 * @param {String}      [options.external_id]   Sets whether the ID given is the external ID of the User.
		 *                                              By default, the value is "false".
		 * @param {Function}    callback                Callback function to handle the response
		 * @param {String}      callback.error          Error message if any
		 * @param {Object}      callback.body           Response body containing the dashboard summary information for the user
		 */

		getUserSummary: function (userid, options, callback) {
			schoox._get(
				`dashboard/users/${userid}/summary`,
				options,
				function (error, body) {
					callback(error, body);
				}
			);
		},
		//#endregion

		//#region GET /dashboard/users/:userid/manager
		/**
		 * Retrieves the manager dashboard information for a specific user.
		 *
		 * @param {String}      userid                  User ID
		 * @param {Object}      [options]               Optional parameters
		 * @param {String}      [options.external_id]   Sets whether the ID given is the external ID of the User.
		 *                                              By default, the value is "false".
		 * @param {Function}    callback                Callback function to handle the response
		 * @param {String}      callback.error          Error message if any
		 * @param {Object}      callback.body           Response body containing the manager dashboard information for the user
		 */

		getUserManagerDashboard: function (userid, options, callback) {
			schoox._get(
				`dashboard/users/${userid}/manager`,
				options,
				function (error, body) {
					callback(error, body);
				}
			);
		},
		//#endregion

		//#region GET /dashboard/courses
		/**
		 * Retrieves a list of all courses with their title, short description, and image.
		 *
		 * @param {String}		  role				            Users' role
		 * @param {Function}    callback                Callback function to handle the response
		 * @param {String}      callback.error          Error message if any
		 * @param {Object}    	callback.body           Response body containing the list of courses
		 */

		getCourses: function (role, callback) {
			const req = {
				role: role,
			};

			schoox._get(`dashboard/courses`, req, function (error, body) {
				callback(error, body);
			});
		},
		//#endregion

		//#region GET /dashboard/courses/:courseid
		/**
		 * Retrieves a list of enrolled users in a course with a summary of information for every user.
		 *
		 * @param {Integer}     courseid                		Course ID
		 * @param {Object}		[options]						Optional Parameters
		 * @param {String}      [options.role=employee]         Users' role. Defaulted to employee
		 * @param {Integer}     [options.aboveId]               Above Unit's ID
		 * @param {Integer}     [options.unitId]                Unit's ID
		 * @param {Integer}     [options.jobId]                 Job's ID
		 * @param {String}      [options.search]                Search text
		 * @param {Integer}     [options.start]                 List's starting position
		 * @param {Integer}     [options.limit]                 Number of users to return per request, up to a maximum of 1,000. Default to 100
		 * @param {String}      [options.sort]                  Sorting criteria
		 * @param {String}      [options.order]                 Descending or ascending order
		 * @param {Function}    callback                		Callback function to handle the response
		 * @param {String}      callback.error          		Error message if any
		 * @param {Object}    	callback.body           		Response body containing the list of enrolled users
		 */

		getUsersEnrolledinCourse: function (courseid, options, callback) {
			const req = {
				role: options.role || 'employee',
				aboveId: options.aboveId,
				unitId: options.unitId,
				jobId: options.unitId,
				search: options.search,
				start: options.start,
				limit: options.limit,
				sort: options.sort,
				order: options.order,
			};

			schoox._get(`dashboard/courses/${courseid}`, req, function (error, body) {
				callback(error, body);
			});
		},
		//#endregion

		//#region GET /dashboard/courses/:courseid/users/:userid
		/**
		 * Retrieves detailed information about a user's progress on a course, including progress, time spent, attempts, and exam scores for each lecture and exam.
		 *
		 * @param {Integer}     courseid                Course ID
		 * @param {Integer}     userid                  User ID
		 * @param {Object}		[options]				Optional Parameters
		 * @param {String}      [options.external_id=false]   Sets whether the ID given is the external ID of the User. By default, the value is "false"
		 * @param {Function}    callback                Callback function to handle the response
		 * @param {String}      callback.error          Error message if any
		 * @param {Object}   	callback.body           Response body containing the detailed course progress information
		 */

		getUsersDetailedCourseProgress: function (
			courseid,
			userid,
			options,
			callback
		) {
			const req = {
				external_id: options.external_id || 'false',
			};

			schoox._get(
				`dashboard/courses/${courseid}/users/${userid}`,
				req,
				function (error, body) {
					callback(error, body);
				}
			);
		},
		//#endregion

		//#region GET /dashboard/curriculums
		/**
		 * Get a list of curriculums.
		 *
		 * @param {Object}		options						Optional paramters
		 * @param {string}		[options.role=employee]		User's role. Defaulted to employee
		 * @param {function}	callback					The callback function.
		 * @param {String} 		callback.error				The error object if an error occurred, null otherwise.
		 * @param {Object} 		callback.body				Response body containing the detailed course progress information
		 */

		getListofCurriculums: function (options, callback) {
			const req = {
				role: options.role || 'employee',
			};

			schoox._get(`curriculums`, req, function (error, body) {
				callback(error, body);
			});
		},
		//#endregion

		//#region GET dashboard/curriculums/:curriculumid
		/**
		 * Returns a list of enrolled users in a curriculum with a summary of information for every user.
		 *
		 * @param {string}     curriculumId        			The ID of the curriculum.
		 * @param {Object}     options             			Optional parameters.
		 * @param {string}     [options.role='employee']    Users' role.
		 * @param {number}     [options.aboveId]   			Above Unit's ID.
		 * @param {number}     [options.unitId]    			Unit's ID.
		 * @param {number}     [options.jobId]     			Job's ID.
		 * @param {string}     [options.search]    			Search text.
		 * @param {number}     [options.start]     			List's starting position.
		 * @param {number}     [options.limit]     			Number of users to return per request, up to a maximum of 1,000. Defaults to 100.
		 * @param {string}     [options.sort]      			Sorting criteria.
		 * @param {string}     [options.order]     			Descending or ascending order.
		 * @param {Function}   callback            			Callback function to handle the response.
		 * @param {string}     callback.error      			Error message if any.
		 * @param {Array}      callback.body       			Response body containing the list of enrolled users with summary information.
		 */
		getEnrolledUsersInCurriculum: function (curriculumId, options, callback) {
			const req = {
				role: options.role || 'employee',
				aboveId: options.aboveId,
				unitId: options.unitId,
				jobId: options.jobId,
				search: options.search,
				start: options.start,
				limit: options.limit,
				sort: options.sort,
				order: options.order,
			};

			schoox._get(
				`dashboard/curriculums/${curriculumId}`,
				req,
				function (error, body) {
					callback(error, body);
				}
			);
		},

		//#region GET dashboard/curriculums/:curriculumid/users/:userid
		/**
		 * Returns detailed information about a user's progress on a curriculum for every single course of it.
		 *
		 * @param {string}     curriculumId          		The ID of the curriculum.
		 * @param {string}     userId                		The ID of the user.
		 * @param {Object}     options               		Optional parameters.
		 * @param {number}     options.acadId        		Your academy ID.
		 * @param {string}     options.apikey        		Your academy's API key.
		 * @param {string}     [options.external_id=false]  Sets whether the ID given is the external ID of the User. Defaults to "false".
		 * @param {string}     [options.dropped_out] 		Sets whether the curricula are dropped out by the user.
		 * @param {Function}   callback              		Callback function to handle the response.
		 * @param {string}     callback.error        		Error message if any.
		 * @param {Array}      callback.body         		Response body containing detailed information about the user's progress on the curriculum.
		 */
		getUsersCurriculumProgress: function (
			curriculumId,
			userId,
			options,
			callback
		) {
			const req = {
				external_id: options.external_id || false,
				dropped_out: options.dropped_out,
			};

			schoox._get(
				`dashboard/curriculums/${curriculumId}/users/${userId}`,
				req,
				function (error, body) {
					callback(error, body);
				}
			);
		},

		//#region GET /dashboard/exams
		/**
		 * Returns a list of all exams with title, image, and publishing date.
		 *
		 * @param {Object}     options               	Optional parameters.
		 * @param {string}     [options.role=employee]  Users' role. Defaulted to employee
		 * @param {Function}   callback              	Callback function to handle the response.
		 * @param {string}     callback.error        	Error message if any.
		 * @param {Array}      callback.body         	Response body containing the list of exams.
		 */
		getListofExams: function (options, callback) {
			const req = {
				role: options.role || 'employee',
			};

			schoox._get('dashboard/exams', req, function (error, body) {
				callback(error, body);
			});
		},
		//#endregion

		//#region GET /dashboard/exams/:examid

		/**
		 * Returns a list of all users for an exam with detailed information about every user's performance.
		 *
		 * @param {string}     examId                	The ID of the exam.
		 * @param {Object}     options               	Optional parameters.
		 * @param {string}     [options.role=employee]  Users' role.
		 * @param {number}     [options.aboveId]     	Above Unit's ID.
		 * @param {number}     [options.unitId]      	Unit's ID.
		 * @param {number}     [options.jobId]       	Job's ID.
		 * @param {string}     [options.search]      	Search text.
		 * @param {number}     [options.start]       	List's starting position.
		 * @param {number}     [options.limit]       	Number of users to return per request, up to a maximum of 1,000. Defaults to 100.
		 * @param {string}     [options.sort]        	Sorting criteria.
		 * @param {string}     [options.order]       	Descending or ascending order.
		 * @param {Function}   callback              	Callback function to handle the response.
		 * @param {string}     callback.error        	Error message if any.
		 * @param {Array}      callback.body         	Response body containing the list of enrolled users with detailed information.
		 */

		getEnrolledUsersInExam: function (examId, options, callback) {
			const req = {
				role: options.role || 'employee',
				aboveId: options.aboveId,
				unitId: options.unitId,
				jobId: options.jobId,
				search: options.search,
				start: options.start,
				limit: options.limit,
				sort: options.sort,
				order: options.order,
			};

			schoox._get(`dashboard/exams/${examId}`, req, function (error, body) {
				callback(error, body);
			});
		},
		//#endregion
	};
};
