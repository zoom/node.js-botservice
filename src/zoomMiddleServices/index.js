const { oauth2, client, setting, log } = require('@zoomus/chatbot');
let parse = require('./parse');
let createZoomAppMiddle = require('./createZoomAppMiddle');
let createWebhookMiddle = require('./createWebhookMiddle');
let createZoomAuthMiddle = require('./createZoomAuthMiddle');

// module.exports = function(commands, config) {
module.exports = function(option) {
  let { commands, botInfo, defaultCommand } = parse(
    option
  );
  let {models,sendMessage,log:botLog,name}=option;
  if(typeof botLog==='function'&&typeof log==='function'){
    log(botLog);
  }
  setting.caseSensitive(false);
  setting.retry({
    sendMessage: {
      no: 3,
      timeout: function(no) {
        return Math.random() * (3000 - 1000) + 1000;
      },
      condition(backMsg, type) {
        if (
          typeof backMsg === 'object' &&
          backMsg.code &&
          backMsg.code.toString() === '7010'
        ) {
          return true;
        }
      }
    }
  });

  let oauth2Client = oauth2(
    botInfo.zoomClientId,
    botInfo.zoomClientSecret,
    botInfo.zoomRedirect_uri
  );
  
  let zoomBot = client(
    botInfo.zoomClientId,
    botInfo.zoomVerifyCode,
    botInfo.zoomBotJid,
    name
    // process.env.app
  )
    .commands(commands)
    .configurate(defaultCommand)
    .defaultAuth(oauth2Client.connect());

  let zoomInfo = {
    bot: zoomBot,
    auth: oauth2Client,
    sendMessage
  };
  
  let appMiddle = createZoomAppMiddle(zoomInfo, models,botLog);
  let authMiddle = createZoomAuthMiddle(zoomInfo, models,botLog);
  let webhookMiddle = createWebhookMiddle(zoomInfo, models,botLog);

  return {
    appMiddle,
    authMiddle,
    webhookMiddle
  };
  // return {
  //   auth: oauth2Client,
  //   bot: zoomBot,
  //   log,
  //   setting
  // };
};
