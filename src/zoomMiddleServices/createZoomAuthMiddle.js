let zoomAuth = (zoom,models,botLog)=>{
  let { bot, auth,sendMessage,request } = zoom;
  return async function(req, res, next) {
    let { code } = req.query;
    try {
      let connection = await auth.connectByCode(code);
      let app = bot.create({ auth: connection });
      //send zoom app
      res.locals.zoomApp = app;
      res.locals.request = request;
      res.locals.databaseModels = models;
      res.locals.botLog = botLog;
      next();
    } catch (e) {
      res.locals.zoomError=e;
      next();
    }
  };
};

module.exports = zoomAuth;
