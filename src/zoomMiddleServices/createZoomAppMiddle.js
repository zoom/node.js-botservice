
let zoomAppMiddle = (zoom,models,botLog)=>{
  let { bot, auth,sendMessage,request } = zoom;  
  return async function(req, res, next) {
    try {
      let connection =  auth.connect();
      let app = bot.create({ auth: connection });
      res.locals.zoomApp = app;
      res.locals.request = request;
      res.locals.databaseModels = models;
      res.locals.botLog = botLog;
      next();
    } catch (e) {
      res.locals.zoomError=e;
      next();
      // console.log(e);
    }
  };
};

module.exports = zoomAppMiddle;
