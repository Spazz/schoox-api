module.exports = function(schoox){
    return {
        //#region GET /groups
        /**
         * Returns a list of all academy groups.
         *
         * @param {Object}      [options]               Array accepting all the optional call values       
         * @param {Integer}     [option.start]          Starting Position (optional)
         * @param {Integer}     [option.limit]          Number of courses to return per request, up to a maximum of 20. Defaults to 20 (optional)
         * @param {Function}    callback                Callback function to handle the response
         * @param {String}      callback.error          Error message if any
         * @param {Object}      callback.body           Response body containing the list of groups
         */
        listGroups: function(options, callback) {

            schoox._get('groups', options, function(error, body) {
                callback(error, body || {});
            });
        },
        //#endregion

        //#region PUT /groups/:groupid/associate
        /**
         * Associates a list of users to a group. Maximum of 10 users per request.
         *
         * @param {String}      groupid         The ID of the group to associate the users with
         * @param {Array}       userIds         An array of user IDs to add to the group
         * @param {Function}    callback        Callback function to handle the response
         * @param {String}      callback.error  Error message if any
         * @param {Object}      callback.body   Response body containing the result of the association
         */

        addUserstoGroup: function(groupid, userIds, callback) {

            schoox._put(`groups/${groupid}/associate`, userIds, function(error, body) {
                callback(error, body || {});
            })
        }
        //#endregion

    }
}