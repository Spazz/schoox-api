module.exports = function(schoox){
    return {
        //#region GET /courses

        /**
         * Retrieves a list of all courses with extended details.
         *
         * @param {Object}     options                        Optional parameters.
         * @param {number}     [options.userId]               The ID of the user you want to retrieve their course list view.
         * @param {string}     [options.search]               The search term for filtering courses.
         * @param {string}     [options.status]               The status of the courses. Available values: "active", "deleted", "archived". Default is "active".
         * @param {number[]}   [options.skills]               The metrics' IDs for retrieving modules related to the skills.
         * @param {number}     [options.start]                The starting position for pagination. Default is 0.
         * @param {number}     [options.limit]                The number of courses to return per request, up to a maximum of 100. Default is 100.
         * @param {Function}   callback                       Callback function to handle the response.
         * @param {string}     callback.error                 Error message if any.
         * @param {Object[]}   callback.body                  Response body containing the list of courses with extended details.
         */

        getCourses: function (options, callback) {
            const req = {
                userId: options.userId,
                search: options.search,
                status: options.status,
                skills: options.skills,
                start: options.start,
                limit: options.limit
            };
        
            schoox._get('courses', req, function (error, body) {
                callback(error, body);
            });
        }
        //#endregion
    } 
}