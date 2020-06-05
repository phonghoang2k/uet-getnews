
# uet-getnews

Back-end server for automate bot of "UET - Get News" page on Facebook.

[![NPM Version][npm-image]

## Installation

Navigate to custom/config.js and fill into 4 variable:
* Facebook page access token.
* Facebook webhook verify token.
* Facebook app secret.
* Mongodb collection url.

Terminal/Bash/CMD:

To install dependencies
```sh
npm install
```

To start project
```sh
npm start
```


## Usage example

- This is a backend server for user to initialize an automate respond bot on Facebook page.
* Project using:
   * NodeJS
   * Mongoose
   * Facebook Graph API
   
* Project need:
   * Facebook page access token.
   * Facebook webhook verify token.
   * Facebook app secret.
for communicate with [Facebook Messenger Platform](https://developers.facebook.com/docs/messenger-platform/) 

To have this, create a new app on [Facebook for developers](https://developers.facebook.com/) AND be approved the __Send API__ *(pages_messaging)* on Messenger platform by Facebook team.



## Release History

* 1.0.0
    * First release
    * FIX: - Crash when run.
           - Optimize import.
* 0.0.1
    * Work in progress

## Meta

Hoang Trung Phong – [Facebook](https://www.facebook.com/kaka.phong.2a63/) – phong2a63@gmail.com

Distributed under the MIT license. See ``LICENSE`` for more information.

[https://github.com/phonghoang2k](https://github.com/phonghoang2k)

## Contributing

1. Fork it (<https://github.com/phonghoang2k/uet-getnews/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

<!-- Markdown link & img dfn's -->
[npm-image]: https://img.shields.io/npm/v/npm
