<h1 align="center">Welcome to schoox-api-wrapper 👋</h1>
<p>
  <a href="https://www.npmjs.com/package/schoox-api-wrapper" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/schoox-api-wrapper.svg">
  </a>
  <img src="https://img.shields.io/badge/node-%3E%3D%208-blue.svg" />
  <a href="https://github.com/Spazz/schoox-api#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/Spazz/schoox-api/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/Spazz/schoox-api/blob/master/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/github/license/Spazz/schoox-api-wrapper" />
  </a>
</p>

> Node.JS wrapper for the Schoox API

## Notes

This is 80 % complete. There are just a handful of calls that are missing that I plan on adding in as soon as I can. If you would like to contribute don't hesitate to make a pull request or send me a message on [Twitter](https://twitter.com/flufymewmew).

[Badges - Completed](https://github.com/Spazz/schoox-api/blob/master/api/calls/badges.js)
[Content - Completed](https://github.com/Spazz/schoox-api/blob/master/api/calls/content.js)
[Courses - Completed](https://github.com/Spazz/schoox-api/blob/master/api/calls/courses.js)
[Curriculums - Completed](https://github.com/Spazz/schoox-api/blob/master/api/calls/curriculums.js)
[Dashboard - Completed](https://github.com/Spazz/schoox-api/blob/master/api/calls/dashboard.js)
[Events](https://github.com/Spazz/schoox-api/blob/master/api/calls/events.js)
[Exams - Completed](https://github.com/Spazz/schoox-api/blob/master/api/calls/exams.js)
[Groups - Completed](https://github.com/Spazz/schoox-api/blob/master/api/calls/groups.js)
[Usage - Completed](https://github.com/Spazz/schoox-api/blob/master/api/calls/usage.js)
[Users](https://github.com/Spazz/schoox-api/blob/master/api/calls/users.js)

## Prerequisites

- node >= 8

## Install

```sh
npm install schoox-api-wrapper
```

## Usage

Include the package

```sh
 const schooxAPI = require('schoox-api-wrapper')
```

Then intiate the module using your academy ID and API key

```sh
const api = schooxAPI('226581108', '9d3419535b0c8d76f7f6f72800f62f92')
```

Then you can start running your calls. Using the getUsage call as an example.

```sh
api.usage.getUsage((err, data) => {
    if(err)
        return console.error(err);

    return console.log(data);

});
```

This would give you the response

```sh
{ availableCalls: 2000, until: '2000-01-01T01:01:01+00:00' }
```

## Author

👤 **Brandon L**

- Github: [@Spazz](https://github.com/Spazz)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/Spazz/schoox-api/issues).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2023 [Brandon L](https://github.com/Spazz).<br />
This project is [MIT](https://github.com/Spazz/schoox-api/blob/master/LICENSE) licensed.

---
