let fs = require('fs-extra');
let cwd = process.cwd();
let nodepath = require('path');
let createZoomMiddles = require('./src/zoomMiddleServices');
let createZoomApis = require('./src/zoomApiServices');
let createDatabaseMiddles = require('./src/databaseServices');
let parseConfig = require('./src/utils/parseConfig');
let apiServices = require('./src/apiServices');

let run = function(router, botConfig) {
  if (typeof botConfig !== 'object') {
    try {
      botConfig = require(nodepath.join(cwd, 'botConfig.js'));
    } catch (e) {
      // console.log(e);
      throw e;
    }
  }

  let {
    botInfo,
    defaultCommand,
    installCallback,
    uninstallCallback,
    botCommands,
    botActions,
    apis,
    sendMessage,
    useDatabase,
    log,
    name
  } = botConfig;

  let { zoomApis, generalApis } = parseConfig.parseApis(apis);

  let models = createDatabaseMiddles({
    useDatabase
  });
  
  let zoomMiddles = createZoomMiddles({
    name,
    log,
    defaultCommand,
    botCommands,
    botInfo,
    models,
    sendMessage
  });

  createZoomApis(
    {
      botCommands,
      botActions,
      apis: zoomApis,
      installCallback,
      uninstallCallback
    },
    router,
    zoomMiddles,
    log
  );

  apiServices(
    {
      apis: generalApis
    },
    router,
    zoomMiddles
  );
};

module.exports = run;
