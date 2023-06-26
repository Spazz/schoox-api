var Schoox = require('../schoox.js');
var extend = require('xtend');

module.exports = function(schoox){
    return {

		//#region GET /dashboard/users
		/**
		 * Returns a list of current users in your organization with a summary of their training performance 
		 * (e.g. total training hours, courses and exams). By default only the first 100 people are returned.
		 * The list can be filtered on letter, role, region and location and paged using the optional paging parameters.
		 * @param {string}	role		Required, this is the role of the user making the call. Defaulted to 'employee'.
		 * @param {Object}	options		Optional, { userId: Integer, external_id: String, aboveId: Integer, jobId: Integer, start: Integer,
		 * 								limit: 100, sort: String }
		 * @callback		complete
		 * @memberof Schoox
		 * @method dashboardGetUsers
		 */

		listUsers: function (role = 'employee', options, callback) {
			
			const req = {
				role: role
			};

			options = extend(options, req);

			this._get('dashboard/users', options, function (error, body) {
				callback(error, body);
			});
		},
		//#endregion

		//#region GET /dashboard/users/:userid/courses
		/**
		 * Returns a list of all courses a user is enrolled in with a summary of his or her total training and training information by course
		 * (e.g. enrollment/assignment date, due date, total time spent on the course and progress).
		 * By default only the first 100 people are returned.
		 * @param {string} userid	Required, this is the Schoox ID or external_id (if the external_id option is set to true)
		 * @param {Object} options 	Optional, {category_id: Integer, external_id: String, dropped_out: String}
		 * @callback	   complete
		 * @memberof	   Schoox
		 * @method		   dashboardGetListofUserCourses 
		 */
		listUserCourses: function (userid, options, callback) {

			this._get(`dashboard/users/${userid}/courses`, options, function(error, body) {
				callback(error, body);
			})
		},
		//#endregion

		//#region GET /dashboard/users/:userid/curriculums
		/**
		 * Returns a list of all curriculums a user is enrolled in with a summary of his or her total training and training information by
		 * curriculum (e.g. enrollment/assignment date, due date, total time spent on the curriculum and progress).
		 * By default only the first 100 people are returned.
		 * @param {string} userid	Required, this is the Schoox ID or external_id (if the external_id option is set to true)
		 * @param {Object} options 	Optional, {external_id: String}
		 * @callback	   complete
		 * @memberof	   Schoox
		 * @method		   dashboardGetListofUserCurriculums 
		 */
		listUserCuriculums: function (userid, options, callback) {

			this._get(`dashboard/users/${userid}/curriculums`, options, function(error, body) {
				callback(error, body);
			})
		},
		//#endregion

		//#region GET /dashboard/users/:userid/exams
		/**
		 * Returns a list of all exams a user has taken so far with information about his or her performance on every exam
		 * (e.g. number of attempts, date of last attempt, score, points, passing score). By default only the first 100 people are returned.
		 * @param {string} userid	Required, this is the Schoox ID or external_id (if the external_id option is set to true)
		 * @param {Object} options 	Optional, {external_id: String}
		 * @callback	   complete
		 * @memberof	   Schoox
		 * @method		   dashboardGetListofUserExams 
		 */
		listUserExams: function (userid, options, callback) {

			this._get(`dashboard/users/${userid}/exams`, options, function(error, body) {
				callback(error, body);
			})
		},
		//#endregion

		//#region GET /dashboard/users/:userid/ojts
		/**
		 * Returns a list of all on the job trainings of a user has taken so far with information about his or her performance on every
		 * on the job training. Also returns a "more" flag which indicates if there are more on the job trainings to show.
		 * By default only the first 100 on the job trainings are returned. You can optionally use the "start" parameter to set
		 * the offset of the listing
		 * @param {string} userid	Required, this is the Schoox ID or external_id if the external_id option is set to true
		 * @param {Object} options 	Optional, {external_id: String, start: Integer}
		 * @callback	   complete
		 * @memberof	   Schoox
		 * @method		   dashboardGetListofUserOJTS 
		 */
		listUserOJTS: function (userid, options, callback) {

			this._get(`dashboard/users/${userid}/ojts`, options, function(error, body) {
				callback(error, body);
			})
		},
		//#endregion

		//#region GET /dashboard/users/:userid/summary
		/**
		 * Get a User's dashboard summary information
		 * @param {string} userid	Required, this is the Schoox ID or external_id if the external_id option is set to true
		 * @param {Object} options 	Optional, {external_id: String}
		 * @callback	   complete
		 * @memberof	   Schoox
		 * @method		   dashboardGetListofUserSummary 
		 */
		listUserSummary: function (userid, options, callback) {

			this._get(`dashboard/users/${userid}/summary`, options, function(error, body) {
				callback(error, body);
			})
		},
		//#endregion

		//#region GET /dashboard/users/:userid/manager
		/**
		 * Get a User's dashboard summary information
		 * @param {string} userid	Required, this is the Schoox ID or external_id if the external_id option is set to true
		 * @param {Object} options 	Optional, {external_id: String}
		 * @callback	   complete
		 * @memberof	   Schoox
		 * @method		   dashboardGetListofUserManager 
		 */
		listUserManager: function (userid, options, callback) {

			this._get(`dashboard/users/${userid}/manager`, options, function(error, body) {
				callback(error, body);
			})
		},
		//#endregion

		//#region GET /dashboard/courses
		/**
		 * Returns a list of all courses with title, short description and image.
		 * @param {string} role		Required, this is the role of the user making the call. Defaulted to 'employee'.
		 * @callback	   complete
		 * @memberof	   Schoox
		 * @method		   dashboardGetListofCourses 
		 */
		listCourses: function (role = 'employee', callback) {

			const options = {
				role: role
			};

			this._get(`dashboard/courses`, options, function(error, body) {
				callback(error, body);
			})
		},
		//#endregion

		//#region GET /dashboard/courses/:courseid
		/**
		 * Returns a list of all courses with title, short description and image.
		 * @param {string} courseid	Required, this is the course id.
		 * @param {string} role		Required, this is the role of the user making the call. Defaulted to 'employee'.
		 * @param {Object} options	Optional, {aboveId: Integer, unitId: Integer, jobId: Integer, search: String, start: Integer, limit: Integer,
		 * 							sort: String, order: String}
		 * @callback	   complete
		 * @memberof	   Schoox
		 * @method		   dashboardGetListofUsersinCourse
		 */
		listUsersinCourse: function (courseid, role = 'employee', options, callback) {

			const reqs = {
				role: role
			};

			options = extend(options, reqs);

			this._get(`dashboard/courses/${courseid}`, options, function(error, body) {
				callback(error, body);
			})
		}
		//#endregion
	}
}
