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

## Need Support?

The first place to look for help is on our [Developer Forum](https://devforum.zoom.us/), where Zoom Marketplace Developers can ask questions for public answers.

If you can’t find the answer in the Developer Forum or your request requires sensitive information to be relayed, please email us at developersupport@zoom.us.