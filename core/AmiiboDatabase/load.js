'use strict';
const _ = require('lodash'),
  fs = require('fs'),
  state = require('./state'),
  log = require('debug-logger')('core:AmiiboDatabase:load');

exports = module.exports = dbpath => new Promise((resolve, reject) => {
  let jsonData = Buffer.from('');
  fs.createReadStream(dbpath)
    .on('error', reject)
    .on('data', chunk => {
      jsonData = Buffer.concat([jsonData, chunk]);
    })
    .on('end', () => {
      state.db = JSON.parse(jsonData.toString());
      log.info('database populated');
      log.debug(`${_.size(state.db.amiibos)} amiibos loaded`);
      resolve();
    });
});
