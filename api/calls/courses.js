module.exports = function (schoox) {
  return {
    //#region GET /courses

    /**
     * Retrieves a list of all courses with extended details.
     *
     * @param {Object}      options                        Optional parameters.
     * @param {number}      [options.userId]               The ID of the user you want to retrieve their course list view.
     * @param {string}      [options.search]               The search term for filtering courses.
     * @param {string}      [options.status]               The status of the courses. Available values: "active", "deleted", "archived". Default is "active".
     * @param {number[]}    [options.skills]               The metrics' IDs for retrieving modules related to the skills.
     * @param {number}      [options.start]                The starting position for pagination. Default is 0.
     * @param {number}      [options.limit]                The number of courses to return per request, up to a maximum of 100. Default is 100.
     * @param {Function}    callback                       Callback function to handle the response.
     * @param {string}      callback.error                 Error message if any.
     * @param {Object}      callback.body                  Response body containing the list of courses with extended details.
     */

    getCourses: function (options, callback) {
      const req = {
        userId: options.userId,
        search: options.search,
        status: options.status,
        skills: options.skills,
        start: options.start,
        limit: options.limit,
      };

      schoox._get('courses', req, function (error, body) {
        callback(error, body);
      });
    },
    //#endregion

    //#region GET /courses/user/:userid

    /**
     * Returns a list of courses enrolled and created by a specific user.
     *
     * @param {string}     userId                        The ID of the user.
     * @param {Object}     options                       Optional parameters.
     * @param {string}     [options.external_id=false]         Sets whether the userId given is the external_id of the User. By default, the value is "false".
     * @param {string}     [options.role]                Role of the user. Available values are: "student", "professor", and "dropped_out".
     * @param {string}     [options.status]              Course status. Available values are: "active" and "archived".
     * @param {string}     [options.search]              Search courses by term.
     * @param {string}     [options.enrolled]            Filter courses user is enrolled in. Available values are: "true" and "false".
     * @param {number}     [options.category_id]         Course Category ID.
     * @param {string}     [options.language]            Filter courses by language. See API documentation for available values.
     * @param {number}     [options.start]               Starting position.
     * @param {number}     [options.limit]               Maximum size of retrieved courses.
     * @param {Function}   callback                      Callback function to handle the response.
     * @param {string}     callback.error                Error message if any.
     * @param {Object}      callback.body                 Response body containing the list of courses.
     */

    getUserCourses: function (userId, options, callback) {
      const req = {
        acadId: options.acadId,
        apikey: options.apikey,
        external_id: options.external_id || 'false',
        role: options.role,
        status: options.status,
        search: options.search,
        enrolled: options.enrolled,
        category_id: options.category_id,
        language: options.language,
        start: options.start,
        limit: options.limit,
      };

      const url = `courses/user/${userId}`;

      schoox._get(url, req, function (error, body) {
        callback(error, body);
      });
    },
    //#endregion

    //#region GET /courses/categories?userId=[userid]

    /**
     * Returns a list of course categories for a specific user.
     *
     * @param {string}      userId                        The ID of the user.
     * @param {Object}      options                       Optional parameters.
     * @param {string}      [options.userId]              User's ID you want to retrieve his/her course details.
     * @param {string}      [options.external_id]         Sets whether the userId given is the external_id of the User. By default, the value is "false".
     * @param {string}      [options.role]                Role of the user. Available values are: "student" and "professor".
     * @param {Function}    callback                      Callback function to handle the response.
     * @param {string}      callback.error                Error message if any.
     * @param {Array}       callback.body                 Response body containing the list of course categories.
     */

    getUserCourseCategories: function (options, callback) {
      const req = {
        external_id: options.external_id,
        role: options.role,
        userId: options.userId,
      };

      schoox._get(`courses/categories`, req, function (error, body) {
        callback(error, body);
      });
    },
    //#endregion

    //#region GET /courses/:courseid

    /**
     * Returns extended details of a specific course.
     *
     * @param {string}      courseId                      The ID of the course.
     * @param {Object}      options                       Optional parameters.
     * @param {number}      [options.userId]              The ID of the user you want to retrieve their course details.
     * @param {string}      [options.status]              Course status. Available values are: "active", "deleted", "archived". Default is "active".
     * @param {Function}    callback                      Callback function to handle the response.
     * @param {string}      callback.error                Error message if any.
     * @param {Object}      callback.body                 Response body containing the details of the course.
     */

    getCourseDetails: function (courseId, options, callback) {
      const req = {
        userId: options.userId,
        status: options.status,
      };

      schoox._get(`courses/${courseId}`, req, function (error, body) {
        callback(error, body);
      });
    },
    //#endregion

    //#region GET /courses/:courseid/students

    /**
     * Returns a list of enrolled users in a course with their enrolled date, progress percentage, and time spent.
     *
     * @param {string}      courseId                      The ID of the course.
     * @param {Object}      options                       Optional parameters.
     * @param {number}      [options.start]               Starting position.
     * @param {number}      [options.limit]               Number of users to return per request, up to a maximum of 1,000. Defaults to 100.
     * @param {string}      [options.onlyCompleted]       Return only users that have completed the course.
     * @param {Function}    callback                      Callback function to handle the response.
     * @param {string}      callback.error                Error message if any.
     * @param {Object}      callback.body                 Response body containing the list of enrolled users.
     */

    getCourseEnrolledUsers: function (courseId, options, callback) {
      const req = {
        start: options.start,
        limit: options.limit,
        onlyCompleted: options.onlyCompleted,
      };

      schoox._get(`courses/${courseId}/students`, req, function (error, body) {
        callback(error, body);
      });
    },
    //#endregion

    //#region GET /courses/:courseid/lectures

    /**
     * Returns a list of lectures in a course. You can retrieve a user's progress percentage, time spent, and number of views for each lecture by his/her Schoox ID.
     *
     * @param {string}      courseId                      The ID of the course.
     * @param {Object}      options                       Optional parameters.
     * @param {number}      [options.userId]              The ID of the user you want to retrieve their course details.
     * @param {Function}    callback                      Callback function to handle the response.
     * @param {string}      callback.error                Error message if any.
     * @param {Object}      callback.body                 Response body containing the list of lectures.
     */
    getCourseLectures: function (courseId, options, callback) {
      const req = {
        userId: options.userId,
      };

      schoox._get(`courses/${courseId}/lectures`, req, function (error, body) {
        callback(error, body);
      });
    },
    //#endregion

    //#region GET /courses/:courseid/exams

    /**
     * Returns a list of exams in a course. You can retrieve the date of his/her last attempt, total score and points, as well as the passing or failure status for each exam by his/her Schoox ID.
     *
     * @param {string}     courseId                      The ID of the course.
     * @param {Object}     options                       Optional parameters.
     * @param {number}     [options.userId]              The ID of the user you want to retrieve their course details.
     * @param {Function}   callback                      Callback function to handle the response.
     * @param {string}     callback.error                Error message if any.
     * @param {Object}      callback.body                 Response body containing the list of exams.
     */

    getCourseExams: function (courseId, options, callback) {
      const req = {
        userId: options.userId,
      };

      schoox._get(`courses/${courseId}/exams`, req, function (error, body) {
        callback(error, body);
      });
    },
    //#endregion

    //#region GET /courses/:courseid/coupons

    /**
     * Returns a list of generated coupons for a specific course.
     *
     * @param {string}     courseId                      The ID of the course.
     * @param {Function}   callback                      Callback function to handle the response.
     * @param {string}     callback.error                Error message if any.
     * @param {Object}      callback.body                 Response body containing the list of coupons.
     */

    getCourseCoupons: function (courseId, callback) {
      const req = {};

      schoox._get(`courses/${courseId}/coupons`, req, function (error, body) {
        callback(error, body);
      });
    },
    //#endregion

    //#region GET /courses/:courseid/coupons/:couponid

    /**
     * Returns a list of a course's enrolled users for a specific coupon with each user's enrolled date, progress percentage, and time spent.
     *
     * @param {string}     courseId                      The ID of the course.
     * @param {string}     couponId                      The ID of the coupon.
     * @param {Function}   callback                      Callback function to handle the response.
     * @param {string}     callback.error                Error message if any.
     * @param {Array}      callback.body                 Response body containing the list of enrolled users.
     */
    getCourseCouponEnrolledUsers: function (courseId, couponId, callback) {
      const req = {};

      schoox._get(
        `courses/${courseId}/coupons/${couponId}`,
        req,
        function (error, body) {
          callback(error, body);
        }
      );
    },
    //#endregion

    //#region GET /courses/:courseid/invitations

    /**
     * Returns a list of all invitations that have been sent for a particular course.
     *
     * @param {string}     courseId                      The ID of the course.
     * @param {Function}   callback                      Callback function to handle the response.
     * @param {string}     callback.error                Error message if any.
     * @param {Array}      callback.body                 Response body containing the list of invitations.
     */
    getCourseInvitations: function (courseId, callback) {
      const req = {};

      schoox._get(
        `courses/${courseId}/invitations`,
        req,
        function (error, body) {
          callback(error, body);
        }
      );
    },
    //#endregion

    //#region GET /courses/:courseId/skills

    /**
     * Returns a list of all metrics related to a course.
     *
     * @param {string}     courseId                      The ID of the course.
     * @param {Function}   callback                      Callback function to handle the response.
     * @param {string}     callback.error                Error message if any.
     * @param {Array}      callback.body                 Response body containing the list of skills.
     */
    getCourseSkills: function (courseId, callback) {
      const req = {};

      schoox._get(`courses/${courseId}/skills`, req, function (error, body) {
        callback(error, body);
      });
    },
    //#endregion

    //#region PUT /courses/:courseid/completeByAdmin

    /**
     * Marks a course as "completed by Admin". The user's course-progress will be updated,
     * and several actions will be triggered such as awarding a course certificate, badge, and credits.
     * Up to 10 user IDs can be sent per call.
     *
     * @param {string}     courseId                                 The ID of the course.
     * @param {Object}     options                                  Optional parameters.
     * @param {string}     options.externalIds                      Defines if the user IDs given are external or not.
     *                                                              By default, the value is "false".
     * @param {Date}       options.completedAt                      Defines the date when the course is marked as completed by the Admin
     *                                                              in YY-MM-DD date format.
     * @param {Object}     requestObject                               Request object schema.
     * @param {Array}      requestObject.userIds                       Array of user IDs.
     * @param {string}     requestObject.certificatePdfBase64          A custom certificate to be given for the completions made by this call,
     *                                                              encoded in base64 and up to 5MB.
     * @param {Function}   callback                                 Callback function to handle the response.
     * @param {string}     callback.error                           Error message if any.
     * @param {Object}     callback.body                            Response body containing the result of the operation.
     */

    completeCourseByAdmin: function (
      courseId,
      options,
      requestObject,
      callback
    ) {
      const req = {
        externalIds: options.externalIds,
        completedAt: options.completedAt,
      };

      const requestObj = {
        userIds: requestObject.users,
        certificatePdfBase64: requestObject.certificatePdfBase64,
      };

      schoox._put(
        `courses/${courseId}/completeByAdmin`,
        req,
        requestObj,
        function (error, body) {
          callback(error, body);
        }
      );
    },
    //#endregion

    //#region PUT /courses/:courseid/issueCustomCertificate

    /**
     * Issues a custom certificate for a specific course for a user.
     *
     * @param {string}     courseId                                     The ID of the course.
     * @param {Object}     requestObject                                Request object schema.
     * @param {string}     requestObject.certificatePdfBase64           A custom certificate to be issued for the completions made by this call,
     *                                                                  encoded in base64 and up to 5MB.
     * @param {Function}   callback                                     Callback function to handle the response.
     * @param {string}     callback.error                               Error message if any.
     * @param {Object}     callback.body                                Response body containing the result of the operation.
     */

    issueCustomCertificate: function (courseId, requestObject, callback) {
      const req = {};

      const requestObj = {
        certificatePdfBase64: requestObject.certificatePdfBase64,
      };

      schoox._put(
        `courses/${courseId}/issueCustomCertificate`,
        req,
        requestObj,
        function (error, body) {
          callback(error, body);
        }
      );
    },
    //#endregion
  };
};
