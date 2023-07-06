module.exports = function (schoox) {
  return {
    //#region GET /curriculums

    /**
     * Returns a list of a user's enrolled & created curriculums with extended details by his/her Schoox ID.
     *
     * @param {number}     userId                The Schoox ID of the user.
     * @param {Object}     [options]             Optional parameters.
     * @param {number}     [options.userId]      User's ID you want to retrieve his/her curriculum list view
     * @param {boolean}    [options.external_id] Sets whether the userId given is the external_id of the User. By default, the value is "false".
     * @param {number}     [options.start]       Starting position.
     * @param {number}     [options.limit]       Maximum size of retrieved curriculums. Defaults to 100.
     * @param {Function}   callback              Callback function to handle the response.
     * @param {string}     callback.error        Error message if any.
     * @param {Array}      callback.body         Response body containing the list of the user's curriculums with extended details.
     */

    getUserCurriculums: function (options, callback) {
      const req = {
        acadId: options.acadId,
        apikey: options.apikey,
        userId: userId,
        external_id: options.external_id,
        start: options.start,
        limit: options.limit,
      };

      schoox._get(`curriculums`, req, function (error, body) {
        callback(error, body);
      });
    },
    //#endregion

    //#region GET /curriculum/:curriculum

    /**
     * Returns extended details of a specific curriculum. A user's progress percentage, time spent, and enrollment date can be retrieved by his/her Schoox ID.
     *
     * @param {string}     curriculumId          The ID of the curriculum.
     * @param {Object}     [options]             Optional parameters.
     * @param {number}     [options.userId]      User's ID to retrieve his/her curriculum details.
     * @param {boolean}    [options.anyLanguage] When set to true, the call will return all courses regardless of language. By default, the value is "false".
     * @param {Function}   callback              Callback function to handle the response.
     * @param {string}     callback.error        Error message if any.
     * @param {Object}     callback.body         Response body containing the extended details of the curriculum.
     */
    getCurriculumDetails: function (curriculumId, options, callback) {
      const req = {
        userId: options.userId,
        anyLanguage: options.anyLanguage,
      };

      schoox._get(`curriculum/${curriculumId}`, req, function (error, body) {
        callback(error, body);
      });
    },
    //#endregion

    //#region GET /curriculums/:curriculum/students

    /**
     * Returns a list of a curriculum's users with details.
     *
     * @param {string}     curriculumId                     The ID of the curriculum.
     * @param {Object}     [options]                        Optional parameters.
     * @param {number}     [options.start]                  Starting position.
     * @param {number}     [options.limit]                  Number of users to return per request, up to a maximum of 1,000. Defaults to 100.
     * @param {boolean}    [options.onlyCompleted]          Return only users that have completed the curriculum.
     * @param {string}     [options.completionStartDate]    Return only users that have completed the curriculum after the given start date (format: YYYY-MM-DD).
     * @param {string}     [options.completionEndDate]      Return only users that have completed the curriculum before the given end date (format: YYYY-MM-DD).
     * @param {Function}   callback                         Callback function to handle the response.
     * @param {string}     callback.error                   Error message if any.
     * @param {Array}      callback.body                    Response body containing the list of curriculum users with details.
     */

    getCurriculumStudents: function (curriculumId, options, callback) {
      const req = {
        acadId: options.acadId,
        apikey: options.apikey,
        start: options.start,
        limit: options.limit,
        onlyCompleted: options.onlyCompleted,
        completionStartDate: options.completionStartDate,
        completionEndDate: options.completionEndDate,
      };

      schoox._get(
        `curriculums/${curriculumId}/students`,
        req,
        function (error, body) {
          callback(error, body);
        }
      );
    },
    //#endregion

    //#region PUT /curriculums/:curriculumid/completeByAdmin

    /**
     * Marks a curriculum as "completed by Admin" and triggers several actions, such as awarding a curriculum certificate, badge, credits, and updating user's curriculum progress if needed.
     *
     * @param {string}     curriculumId                 The ID of the curriculum.
     * @param {Array}      users                        Array of users to be marked complete
     * @param {Object}     options                      Optional parameters.
     * @param {Array}      options.externalIds          Defines if the user's IDs are external or not.
     * @param {string}     [options.completedAt]        The date when the curriculum is marked as completed by the Admin, in YYYY-MM-DD date format.
     * @param {Function}   callback                     Callback function to handle the response.
     * @param {string}     callback.error               Error message if any.
     * @param {Object}     callback.body                Response body containing the result of marking the curriculum as completed.
     */

    completeCurriculumByAdmin: function (
      curriculumId,
      users,
      options,
      callback
    ) {
      const req = {
        externalIds: options.externalIds,
        completedAt: options.completedAt,
      };

      schoox._put(
        `curriculums/${curriculumId}/completeByAdmin`,
        req,
        users,
        function (error, body) {
          callback(error, body);
        }
      );
    },

    //#endregion
  };
};
