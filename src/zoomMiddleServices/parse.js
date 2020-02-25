let R = require('ramda');
let parse = option => {
  let { defaultCommand = [], botInfo, botCommands } = option;
  
  let outCommands = botCommands.map(info => {
    let { command, hint, description } = info;
    description = description ? description : 'No Description';
    return { command, hint, description };
  });

  let {
    zoomClientId = process.env.zoomClientId,
    zoomClientSecret = process.env.zoomClientSecret,
    zoomRedirect_uri = process.env.zoomRedirect_uri,
    zoomVerifyCode = process.env.zoomVerifyCode,
    zoomBotJid = process.env.zoomBotJid
  } = R.defaultTo({})(botInfo);
  // defaultCommand = R.defaultTo({
  //   help: false,
  //   errorHelp: false
  // })(defaultCommand);
  defaultCommand={
    help:false,
    errorHelp:false
  };
  
  return {
    defaultCommand,
    commands: outCommands,
    botInfo: {
      zoomClientId,
      zoomClientSecret,
      zoomRedirect_uri,
      zoomVerifyCode,
      zoomBotJid
    }
  };
};

module.exports = parse;
