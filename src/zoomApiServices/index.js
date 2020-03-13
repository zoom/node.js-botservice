let R = require('ramda');

let createApiServices = function(option, router, zoomMiddles,log) {
  let {
    botCommands = [],
    botActions,
    apis,
    installCallback
    // uninstallCallback
  } = option;

  let { auth, command } = apis;

  //handle auth router
  if (R.type(auth) === 'Object') {
    let { url = '/auth', method = 'post', callback } = auth;
    router[method](url, zoomMiddles.authMiddle, async function(req,res,next){
      await callback(req,res,next);
      if(typeof log==='function'){
        log({
          type:'auth',
          message:{request:req}
        });
      }
    });
  }
  if (R.type(command) === 'Object') {
    let { url = '/command', method = 'post', callback } = command;
    router[method](url, zoomMiddles.webhookMiddle, function(req, res, next) {
      let { zoomWebhook, zoomError } = res.locals;
      if (zoomError) {
        next();
        return;
      }

      let { event, command: originCommand } = zoomWebhook;
      // let { cmd } = payload;

      if (event === 'bot_first_notification') {
        // this is first slash command
        res.locals.zoomFirstNotification = true;
      }

      if (event === 'bot_installed' && typeof installCallback === 'function') {
        //first install callback
        //run install command
        installCallback(req, res);
      } else if (event.indexOf('interactive') !== -1) {
        //event type,call coming event type
        if (typeof botActions === 'function') {
          botActions(req, res);
        } else if (Array.isArray(botActions)) {
          let hasInteract = false;
          let noInteractItem = null;

          botActions.forEach((item, ind) => {
            let { command, callback } = item;
            if (command === undefined) {
              noInteractItem = item;
            } else if (
              R.type(command) === 'String' &&
              event === command &&
              typeof callback === 'function'
            ) {
              callback(req, res);
              hasInteract = true;
            }
          });

          if (hasInteract === false) {
            if (
              R.type(noInteractItem) === 'Object' &&
              typeof noInteractItem.callback === 'function'
            ) {
              noInteractItem.callback(req, res);
            }
          }
        }
      } else {
        //run slash content

        if (typeof botCommands === 'function') {
          botCommands(req, res);
        } else if (Array.isArray(botCommands)) {
          let hasCommand = false;
          let noCommandItem = null;
          botCommands.forEach((item, ind) => {
            let { command, callback } = item;
            if (command === undefined) {
              noCommandItem = item;
            } 
            else if (
              R.type(command) === 'String' &&
              R.type(originCommand) === 'String' &&
              originCommand === command &&
              typeof callback === 'function'
            ) {
              callback(req, res);
              hasCommand = true;
            }
            else if(
              R.type(command) === 'RegExp' &&
              R.type(originCommand) === 'String' &&
              originCommand.match(command)!==null &&
              typeof callback === 'function'
            ){
              callback(req, res);
              hasCommand = true;
            }
            
          });

          if (hasCommand === false) {
            if (
              R.type(noCommandItem) === 'Object' &&
              typeof noCommandItem.callback === 'function'
            ) {
              noCommandItem.callback(req, res);
            }
          }
        }
      }
      if(typeof log==='function'){
        log({
          type:'webhook',
          message:{request:req}
        });
      }
    });

  }
};

module.exports = createApiServices;
