# botservice
This is the core package which [zoom @zoomus/chatbot-cli](https://www.npmjs.com/package/@zoomus/chatbot-cli) used. It will create the apis&&commands&actions&&middleware for you that defined in botConfig.js


## Installation

`npm i @zoomus/botservice -S`


## Usage

After follow code,we will bind botConfig.js config to implement related functions

```js
const botservice = require('@zoomus/botservice');
botservice(expressApp, botConfig);
```

## Need help?

If you're looking for help, try [Developer Support](https://devsupport.zoom.us) or our [Developer Forum](https://devforum.zoom.us). Priority support is also available with [Premier Developer Support](https://zoom.us/docs/en-us/developer-support-plans.html) plans.
