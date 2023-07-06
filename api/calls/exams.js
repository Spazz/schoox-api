module.exports = function (schoox) {
  return {
    //#region GET /exams

    /**
     * Returns a list of all academy exams with extended details.
     *
     * @param {Object}     [options]               Optional parameters.
     * @param {number}     [options.start]       Starting position.
     * @param {number}     [options.limit]       Maximum size of retrieved exams. Defaults to 100.
     * @param {Function}   callback              Callback function to handle the response.
     * @param {string}     callback.error        Error message if any.
     * @param {Array}      callback.body         Response body containing the list of exams with extended details.
     */

    getAcademyExams: function (options, callback) {
      const req = {
        start: options.start,
        limit: options.limit,
      };

      schoox._get('exams', req, function (error, body) {
        callback(error, body);
      });
    },
    //#endregion

    //#region GET /exams/:examid/students

    /**
     * Returns a list of all users that are enrolled in an exam with their best performance statistics.
     *
     * @param {string}     examId                The ID of the exam.
     * @param {Object}     [options]             Optional parameters.
     * @param {number}     [options.start]       Starting position.
     * @param {number}     [options.limit]       Number of users to return per request, up to a maximum of 1,000. Defaults to 100.
     * @param {Function}   callback              Callback function to handle the response.
     * @param {string}     callback.error        Error message if any.
     * @param {Array}      callback.body         Response body containing the list of enrolled users with best performance statistics.
     */

    getEnrolledUsersInExam: function (examId, options, callback) {
      const req = {
        start: options.start,
        limit: options.limit,
      };

      schoox._get(`exams/${examId}/students`, req, function (error, body) {
        callback(error, body);
      });
    },
    //#endregion

    //#region GET /exams/:examid/students/:userid

    /**
     * Returns detailed performance statistics of an exam for a specific user.
     *
     * @param {string}     examId                The ID of the exam.
     * @param {string}     userId                The ID of the user.
     * @param {Function}   callback              Callback function to handle the response.
     * @param {string}     callback.error        Error message if any.
     * @param {Object}     callback.body         Response body containing the detailed performance statistics of the exam for the user.
     */
    getExamPerformanceForUser: function (examId, userId, callback) {
      const req = {};

      schoox._get(
        `exams/${examId}/students/${userId}`,
        req,
        function (error, body) {
          callback(error, body);
        }
      );
    },

    //#endregion
  };
};
