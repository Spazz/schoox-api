const extend = require('xtend');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

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

    // Would like to use this but intellisense can't pick it up.
    //this._loadCalls();

    this.usage = require('./calls/usage')(this);
    this.users = require('./calls/users')(this);
    this.groups = require('./calls/groups')(this);
    this.exams = require('./calls/exams')(this);
    this.events = require('./calls/events')(this);
    this.dashboard = require('./calls/dashboard')(this);
    this.curriculums = require('./calls/curriculums')(this);
    this.courses = require('./calls/courses')(this);
    this.content = require('./calls/content')(this);
    this.badges = require('./calls/badges')(this);

    }

    // See comment on line #26
  // _loadCalls() {
  //   const callsDirectory = path.join(__dirname, 'calls');
  //   const files = fs.readdirSync(callsDirectory);

  //   files.forEach(file => {
  //     const fileName = path.parse(file).name;
  //     const funcName = fileName.replace('.js', '');

  //     this[funcName] = require(`./calls/${fileName}`)(this);
  //   });
  // }

  _get(url, parameters, callback) {
    const config = {
      baseURL: this.baseURL,
      params: extend(parameters, this.#credentials),
    };

    console.log('GET:', url);

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

  _put(url, parameters, requestObject, callback) {
    
    const config = {
      baseURL: this.baseURL,
      params: extend(parameters, this.#credentials),
    };

    console.log('PUT:', url, config.params);
    console.log(requestObject);

    axios
      .put(url, requestObject, config)
      .then(function (response) {
        callback(null, response.data || {});
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
        callback(null, response || {});
      })
      .catch(function (error) {
        callback(error, {});
      });
  }
}

module.exports = Schoox;