let webhookMiddle = (zoom,models,botLog)=>  {
  let { bot, auth, log,sendMessage } = zoom;
  return async (req, res, next) => {
    let { body, headers } = req;
    try {
      let data = await bot.handle({ body, headers });
      //get app instance
      let newApp = bot.create({ auth: auth.connect() });
      res.locals.zoomApp = newApp;
      res.locals.zoomWebhook = data;
      res.locals.databaseModels = models;
      res.locals.botLog = botLog;
      next();
    } catch (e) {
      res.locals.zoomError=e;
      next();
    }
  };
};

module.exports = webhookMiddle;
