var extend = require('xtend');
var request = require('request');
var querystring = require('querystring');

var prod_URL = "https://api.schoox.com/v1";
var stage_URL = "https://staging.schoox.com/api/v1";

var API_URL = prod_URL;

/**
 * Schoox API Client.
 * @constructor
 * @param {string}		acadId		Your Schoox Academy ID
 * @param {string}		apiKey		Your Schoox API Key
 * @param {string}		env			Environment to call against (stage or prod). Default value is prod.
 * @module schoox
 * @author Brandon Loeffler <brandon_l121@yahoo.com>
 */

var Schoox = function (acad_id, api_key, env) {

	switch(env) {
		case "stage":
			this.baseURL = "https://staging.schoox.com/api/v1";
			break;
		case "prod":
			this.baseURL = "https://api.schoox.com/v1";
			default:
				this.baseURL = "https://api.schoox.com/v1";
	}

	this.credentials = {
		acadId: acad_id,
		apikey: api_key
	};
};

module.exports = Schoox;

// ******************************************************************************************************
// GET Helper
// ******************************************************************************************************

/**
 * Helper to handle requests to the API with authorization.
 *
 * @private
 * @param {string}    url             address part after API root
 * @param {Object}    parameters      additional parameters
 * @callback          complete
 * @memberof Schoox
 * @method get
 */
Schoox.prototype._get = function (url, parameters, callback) {
	parameters = extend(parameters, this.credentials); // Add credentials to parameters
	var getURL = this.baseURL + '/' + url + '?' + querystring.stringify(parameters); // Construct URL with parameters

	console.log("Requesting... " + getURL);

	request.get({
		url: getURL,
		strictSSL: true,
		json: true
	}, function (error, response, body) {
		
		if (response.statusCode != 200) {
			error = new Error("Status was not OK.", response.statusCode);
		}
		callback(error, body || {});
	});
};

// ******************************************************************************************************
// PUT Helper
// ******************************************************************************************************


/**
 * Helper to handle requests to the API with authorization.
 *
 * @private
 * @param {string}    url             	address part after API root
 * @param {Object}    requestObject      additional parameters
 * @callback          complete
 * @memberof Schoox
 * @method post
 */
Schoox.prototype._put = function (url, requestObject, callback) {
	var getURL = this.baseURL + '/' + url + '?' + querystring.stringify(this.credentials); // Construct URL with parameters

	console.log("Requesting..." + getURL);
	console.log(requestObject);

	request.put({
		url: getURL,
		json: true,
		body: requestObject
	}, function (error, response, body) {
		
		callback(error, response, body || {});
	});
};

// ******************************************************************************************************
// POST Helper
// ******************************************************************************************************


/**
 * Helper to handle requests to the API with authorization.
 *
 * @private
 * @param {string}    url             	address part after API root
 * @param {Object}    requestObject      additional parameters
 * @callback          complete
 * @memberof Schoox
 * @method post
 */
Schoox.prototype._post = function (url, requestObject, callback) {
	var getURL = this.baseURL + '/' + url + '?' + querystring.stringify(this.credentials); // Construct URL with parameters

	console.log("Requesting..." + getURL);
	console.log(requestObject);

	request.post({
		url: getURL,
		json: true,
		body: requestObject
	}, function (error, response, body) {
		
		callback(error, response, body || {});
	});
};