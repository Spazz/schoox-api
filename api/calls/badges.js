module.exports = function(schoox){
    return {
        //#region GET /content
        /**
         * Returns a list of all badges according to their type
         *
         * @param {Object}      [options]               Optional parameters
         * @param {Integer}     [options.badge_type]    The badge type of the badges requested. Possible values "schoox", "group", "academy". By default, the value is "schoox"
         * @param {Function}    callback                Callback function to handle the response
         * @param {String}      callback.error          Error message if any
         * @param {Array}       callback.body           Response body containing the list of badges
         */

        listBadges: function(options, callback) {

            schoox._get('badges', options, function(error, body) {
                callback(error, body || {});
            });
        },

        //#region PUT /badges/:badgeid/award
        /**
         * Awards a badge to a list of users. Maximum 10 users per request.
         *
         * @param {String}      badgeid             The ID of the badge to be awarded
         * @param {Array}       users               The list of users to whom the badge will be awarded
         * @param {Function}    callback            Callback function to handle the response
         * @param {String}      callback.error      Error message if any
         * @param {Object}      callback.body       Response body containing the result of the badge awarding process
         */

        awardBadge: function(badgeid, users, callback) {

            schoox._put(`badges/${badgeid}/award`, users, function(error, body) {
                callback(error, body || {});
            });
        },
    }
}