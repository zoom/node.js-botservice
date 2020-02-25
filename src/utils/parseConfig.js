let R = require('ramda');

let zoomTypes = ['command', 'auth'];

let parseApis = (apis) => {
  let zoomApis = {};
  let generalApis = [];
  if (R.type(apis) === 'Array') {
    apis.forEach((item, ind) => {
      if (R.type(item) === 'Object') {
        if (R.and(item.zoomType, zoomTypes.indexOf(item.zoomType) !== -1)) {
        //   zoomApis.push(item);
        zoomApis[item.zoomType]=item;
        } else {
          generalApis.push(item);
        }
      }
    });
  }

  return {
    zoomApis,
    generalApis
  };
};

module.exports=parseApis;








module.exports = { parseApis };
