module.exports = function(schoox){
    return {
        //#region GET /content
        /**
         * Returns Details about the Academy content.
         *
         * @param {Object}      [options]               Optional parameters
         * @param {Integer}     [options.start]         Starting Position
         * @param {Integer}     [options.limit]         Number of content items to return per request, up to a maximum of 20. Defaults to 20
         * @param {String}      [options.order_by]      Content items ordering. Possible values are 'title', 'time_added', 'time_modified'. Defaults to 'time_added'
         * @param {String}      [options.direction]     Content items ordering direction. Possible values are 'asc' or 'desc'. Defaults to 'desc'
         * @param {Integer}     [options.category_id]   Filters content items by their category ID
         * @param {Integer}     [options.type_id]       Filters content items by their type ID. Possible values are 1 (Web Resources), 2 (Files)
         * @param {Integer}     [options.sub_type_id]   Filters content items by their sub type ID. Possible values are 1 (Online Video), 2 (Online Document), 3 (Online Article), 4 (Online Photo), 5 (Academic Link), 6 (Website), 7 (Document), 8 (Video), 9 (Image), 10 (Audio), 11 (Scorm)
         * @param {String}      [options.tags]          Filters content items by their tags
         * @param {String}      [options.search]        Filters content items by their name
         * @param {Function}    callback                Callback function to handle the response
         * @param {String}      callback.error          Error message if any
         * @param {Array}       callback.body           Response body containing the list of content items
         */

        listContent: function(options, callback) {

            schoox._get('content', options, function(error, body) {
                callback(error, body || {});
            });
        },
        //#endregion

        //#region GET /content/categories
        /**
         * Returns Academy Content categories.
         *
         * @param {Object}      [options]           Optional parameters
         * @param {Integer}     [options.limit]     Number of content items to return per request, up to a maximum of 20. Defaults to 20
         * @param {String}      [options.search]    Filters content items by their name
         * @param {Function}    callback            Callback function to handle the response
         * @param {String}      callback.error      Error message if any
         * @param {Array}       callback.body       Response body containing the list of content categories
         */

        listCategories: function(options, callback) {

            schoox._get('content/categories', options, function(error, body) {
                callback(error, body || {});
            });
        },

        //#region GET /content/venues
        /**
         * Returns a list of Venues.
         *
         * @param {Object}      [options]           Optional parameters
         * @param {Integer}     [options.start]     Starting Position
         * @param {Integer}     [options.limit]     Number of Venues to return per request, up to a maximum of 20. Defaults to 20
         * @param {String}      [options.search]    Filters Venues by their name
         * @param {Function}    callback            Callback function to handle the response
         * @param {String}      callback.error      Error message if any
         * @param {Array}       callback.body       Response body containing the list of Venues
         */

        listVenues: function(options, callback) {

            schoox._get('content/venues', options, function(error, body) {
                callback(error, body || {});
            });
        },

        //#region GET /content/timezones
        /**
         * Returns a list of available Timezones.
         *
         * @param {Function}    callback        Callback function to handle the response
         * @param {String}      callback.error  Error message if any
         * @param {Array}       callback.body   Response body containing the list of available Timezones
         */

        listTimezones: function(callback) {
            const options = {};

            schoox._get('content/timezones', options, function(error, body) {
                callback(error, body || {});
            });
        }
    }
}