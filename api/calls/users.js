var extend = require('xtend');

module.exports = function(schoox){
    return {

        //#region GET /users

        /**
         * Retrieves a list of academy users based on the specified role.
         *
         * @param {Object}     options                      Optional parameters.
         * @param {string}     [options.role=employee]      Role of the users. Available values are: "employee", "customer", "instructor", and "member". Defaulted to employee
         * @param {boolean}    [options.past]               Specify as "true" to list past employees if the given role is "employee". Default value is "false".
         * @param {string}     [options.search]             Search by user's firstname or lastname.
         * @param {number}     [options.aboveId]            Above Unit's ID.
         * @param {number}     [options.unitId]             Unit's ID.
         * @param {number}     [options.jobId]              Job's ID.
         * @param {number}     [options.start]              Starting position.
         * @param {number}     [options.limit]              Number of users to return per request, up to a maximum of 100. Default value is 100.
         * @param {Function}   callback                     Callback function to handle the response.
         * @param {string}     callback.error               Error message if any.
         * @param {Object}     callback.body                Response body containing the list of users.
         */

        getUsers: function (options, callback) {
            const req = {
                role: options.role || 'employee',
                past: options.past,
                search: options.search,
                aboveId: options.aboveId,
                unitId: options.unitId,
                jobId: options.jobId,
                start: options.start,
                limit: options.limit
            };
        
            schoox._get('users', req, function (error, body) {
                callback(error, body);
            });
        },
        //#endregion
        
        //#region GET /users/:userid

        /**
         * Retrieves details of a specific user.
         *
         * @param {string}     userid                       The ID of the user.
         * @param {Object}     options                      Optional parameters.
         * @param {string}     [options.external_id=false]  Sets whether the ID given is the external_id of the user. By default, the value is "false".
         * @param {Function}   callback                     Callback function to handle the response.
         * @param {string}     callback.error               Error message if any.
         * @param {Object}     callback.body                Response body containing the details of the user.
         */
        getUserDetails: function (userid, options, callback) {
            
            const req = {
            external_id: options.external_id || 'false'
            };
        
            schoox._get(`users/${userid}`, req, function (error, body) {
                callback(error, body);
            });
        },
        //#endregion
    

        //#region POST /users
        /**
         * Returns a list of enrolled users in a curriculum with a summary of information for every user
         *
         * @param {integer}	userId			Required, id of the user
         * @param {integer}	curriculumId	Required, id of the curriculum
         * @param {Object}	options			Optional, {external_id: integer}
         * @callback		complete
         */
        createUser: function(args, callback) {
            //TODO: Add checks to confirm all relevant information is provided before making call.
            //TODO: How do I return an error if information isn't provided?
                // I do this by returning callback(" <field name missing> missing");
            required = {
                firstname: `String`,
                lastname: `String`,
                password: `String`,
                roles: `String`,
                unit_ids: `Array`,
                jobs: `String`
            };
            schoox._post('users', args, function(error, body) {
               callback(error, body);
            });
        },
        //#endregion
        
        //#region PUT /users/:userid
        /**
         * Edits the details of a specific user.
         *
         * @param {string}      userid                         The ID of the user. 
         * @param {Object}      [options]                      Optional parameters
         * @param {string}      [options.external_id]          Sets whether the ID given is the external_id of the user. By default, the value is "false".
         * @param {Object}      userData                       Object of all values you want updated on the user.
         * @param {Function}    callback                       Callback function to handle the response.
         * @param {string}      callback.error                 Error message if any.
         * @param {Object}      callback.body                  Response body containing the details of the updated user.
         */
        editUser: function (userid, options, userData, callback) {
            const req = {
                external_id: options.external_id,
            };
        
            schoox._put(`users/${userid}`, req, userData, function (error, body) {
            callback(error, body);
            });
        },
        //#endregion
  


        //#region PUT /units/:unitid
        /**
         * Changes the name and/or the above units of a Unit.
         *
         * @param {integer}	unitId			Required, id of the user
         * @param {Object}	options			Required, {above_ids: [12345, 123456, ...]}
         * @callback		complete
         */
        editUnit: function(args, callback) {
            //TODO: Add checks to confirm all relevant information is provided before making call.
            //TODO: How do I return an error if information isn't provided?
            schoox._put(`units/${unitId}`, args, function(error, body) {
               callback(error, body);
            });
        },
        //#endregion

        //#region POST /units/bulk
        /**
         * Creates multiple Units (maximum of 100) via a single request.
         *
         * @param {Object}	options			Required, [ {name: "Name of Unit", above_ids: [12345, 123456, ...]}, ...]
         * @callback		complete
         * @memberof Schoox
         * @method editUnit
         */
        createBulkUnits: function(args, callback) {
            //TODO: Add checks to confirm all relevant information is provided before making call.
            //TODO: How do I return an error if information isn't provided?
            schoox._post('units/bulk', args, function(error, body) {
               callback(error, body);
            });
        },
        //#endregion

        //#region GET /aboves
        /**
         * Returns a list of Above Units (max. 100/request) of your Academy.
         *
         * @param {Object}	options			Optional
         * @callback		complete
         * @memberof Schoox
         * @method editUnit
         */
        listAboveUnits: function(args, callback) {
            schoox._get('aboves', args, function(error, body) {
               callback(error, body);
            });
        },
        //#endregion

        //#region GET /units
        /**
         * Returns a list of Units of your Academy.
         *
         * @param {Object}	options			Optional
         * @callback		complete
         * @memberof Schoox
         * @method editUnit
         */
        listUnits: function(args, callback) {
            schoox._get('units', args, function(error, body) {
               callback(error, body);
            });
        },
        //#endregion

        //#region GET /jobs
        /**
         * Returns a list of Jobs in your Academy.
         *
         * @param {Object}	args			
         * @callback		complete
         * @memberof Schoox
         * @method editUnit
         */
        listJobs: function(args, callback) {
            schoox._get('jobs', args, function(error, body) {
               callback(error, body);
            });
        },
        //#endregion
        
        //#region PUT /jobs/:jobid

        /**
         * Edits a job by changing its name and/or report ID.
         *
         * @param {string}     jobId                    The ID of the job.
         * @param {Object}     requestObj               Request object schema.
         * @param {Object}     options                  Optional Parameters.  
         * @param {string}     options.external_id      Sets whether the ID given is the external ID of the Job.
         *                                              By default, the value is "false".
         * @param {string}     options.title            Sets whether the ID given is the current title of the Job.
         *                                              By default, the value is "false".
         * @param {Object}     requestObj
         * @param {string}     requestObj.name          New name for the job.
         * @param {Function}   callback                 Callback function to handle the response.
         * @param {string}     callback.error           Error message if any.
         * @param {Object}     callback.body            Response body containing the result of the operation.
         */
        
        editJob: function (jobId, options, requestObj, callback) {
            
            const req = {
            external_id: options.external_id,
            title: options.title
            };
        
            schoox._put(`jobs/${jobId}`, req, requestObj, function (error, body) {
                callback(error, body);
            });
        },
        
        //#endregion
  


        //#region PUT /users/:userid/units
        /**
         * Adds Units to a given User by an array of Unit Ids.
         *
         * @param {Integer} userId			ID of the user you want to add units to
         * @param {Array} 	units			Array of Unit IDs you want added to the User
         * @param {Object}	options			Optional, {external_id: String, title: String}
         * @callback		complete
         * @memberof        Schoox
         * @method          addUnitsToUser
         */
        addUnitsToUser: function(userId, units, options, body, callback) {

            schoox._put(`users/${userId}/units`, options, body, function(error, res, body) {
               callback(error, res, body);
            });
        },
        //#endregion

        //#region PUT /users/:userid/aboves
        /**
         * Adds Above Units to a given User by an array of Unit Ids.
         *
         * @param {String}  userId          Required, userID of the user you want to update above units on
         * @param {Array}   aboveUnits      Required, above units you want to add to the user
         * @param {Object}  options			Optional, {external_id: String, title: String}
         * @callback		complete
         * @memberof        Schoox
         * @method          addAboveUnitstoUser
         */
        addAboveUnitstoUser: function(userId, aboveUnits, options, callback) {

            schoox._put(`users/${userId}/aboves`, options, aboveUnits, function(error, res, body) {
               callback(error, res, body);
            });
        },
        //#endregion

        //#region PUT /users/:userid/jobs
        /**
        * Edit the jobs of a given user by an array of units/above units & their job Ids.
        * User must be previously assigned to the specified units & above units.
        *
        * @param {String}   userId          Required, ID of the user you want to 
        * @param {Array} 	data			ID of the user you want to add units to
        * @param {Object}	options			Optional
        * @callback		    complete
        * @memberof         Schoox
        * @method           updateUsersJobs
        */
        updateUsersJobs: function(userId, body, callback) {

            schoox._put(`users/${userId}/jobs`, args, body, function(error, res, body) {
               callback(error, res, body);
            });
        },
        //#endregion

        //#region DEL /units/:userid
        /**
         * Deletes a specific Unit.
         * 
         * @param       {integer}	unitId			    Required, id of the unit
         * @param       {Object}	_options			    Optional settings
         * @param       {String}    options.title       Sets whether the id given is the current title of the Unit. By default, the value is "false"
         * @param       {String}    options.external_id Sets whether the id given is the external_id of the Unit. By default, the value is "false"
         * @callback                callback
         * @param       {String}    error               Returns any error messages
         * @param       {JSON}      body                Returns the call body                    
         * @memberof Schoox
         * @method dashboardGetUsersCurriculumProgress
         */

        deleteUnit: function(unitId, _options, callback) {

            schoox._delete(`units/${unitId}`, function(error, body) {
               callback(error, body);
            });
        }
        //#endregion
    };
};