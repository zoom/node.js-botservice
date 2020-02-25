let R = require('ramda');

let apiServices = function(option, router, zoomMiddles) {
  let { apis } = option;
  if (R.type(apis) === 'Array') {
    apis.forEach((item, ind) => {
      let { url, method = 'all', callback } = item;
      router[method](url, zoomMiddles.appMiddle, callback);
    });
  }
};

module.exports = apiServices;
