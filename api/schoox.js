const extend = require('xtend');
const axios = require('axios');

class Schoox {
  #credentials;

  constructor(acad_id, api_key, env) {
    switch (env) {
      case 'stage':
        this.baseURL = 'https://staging.schoox.com/api/v1';
        break;
      case 'prod':
        this.baseURL = 'https://api.schoox.com/v1';
        break;
      default:
        this.baseURL = 'https://api.schoox.com/v1';
    }

    this.#credentials = {
      acadId: acad_id,
      apikey: api_key,
    };

    this.usage = require('./calls/usage')(this);
    this.users = require('./calls/users')(this);
  }

  _get(url, parameters, callback) {
    const config = {
      baseURL: this.baseURL,
      params: extend(parameters, this.#credentials),
    };

    console.log('GET:', url, config.params);

    axios
      .get(url, config)
      .then(function (response) {
        if (response.status !== 200) {
          throw new Error(`Status was not OK. ${response.status}`);
        }
        callback(null, response.data || {});
      })
      .catch(function (error) {
        callback(error, {});
      });
  }

  _put(url, requestObject, callback) {
    const config = {
      baseURL: this.baseURL,
      params: this.#credentials,
    };

    console.log('PUT:', url, config.params);
    console.log(requestObject);

    axios
      .put(url, requestObject, config)
      .then(function (response) {
        callback(null, response, response.data || {});
      })
      .catch(function (error) {
        callback(error, {});
      });
  }

  _post(url, requestObject, callback) {
    const config = {
      baseURL: this.baseURL,
      params: this.#credentials,
    };

    console.log('POST:', url, config.params);
    console.log(requestObject);

    axios
      .post(url, requestObject, config)
      .then(function (response) {
        callback(null, response, response.data || {});
      })
      .catch(function (error) {
        callback(error, {});
      });
  }
}

module.exports = Schoox;