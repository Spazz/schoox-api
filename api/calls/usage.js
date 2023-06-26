module.exports = function(schoox){
    return {
        //#region GET /usage
        /**
         * Returns the remaining calls according to your plan.
         * @callback        complete
         * @memberof        Schoox
         * @method          getUsage 
         */
        getUsage: function(callback) {
            options = {};
            schoox._get('usage', options, function(err, body) {
                callback(err, body);
            })
        }
    }
}