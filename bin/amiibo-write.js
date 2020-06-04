'use strict';
/*
const _ = require('lodash');
const {NFC} = require('nfc-pcsc');
const nfc = new NFC();
*/
const core = require('../core');

const amiiboBinFilePath = process.argv[2];
const amiiboBin = new core.AmiiboBinFile(amiiboBinFilePath);
amiiboBin
  .on('error', err => {
    console.error(err);
    process.exit(1);
  })
  .on('open', () => {
    console.log(`opened ${amiiboBin.path}`);
    console.dir(amiiboBin.data);
    process.exit(0);
  });

/*
nfc
  .on('reader', reader => {
    reader
      .on('error', err => console.error('reader error', err))
      .on('end', () => console.log(`${reader.reader.name} device removed`))
      .on('card', card => {
        reader.read(0, 540)
          .then(data => {
            const amiibo = new core.Amiibo(reader);
            return amiibo.validateBlankTag()
              .catch(err => console.error('tag is locked', err))
              .then(() => amiibo.id())
              .then(id => {
                console.log('id: ', id);
                return db.lookupAmiiboById(id);
              })
              .then(amiibo => console.log(`amiibo:`, _.get(amiibo, 'name', 'unknown')))
              .then(() => amiibo.password())
              .then(pw => console.log(`amiibo password: ${pw.toString('hex')}`))
              .then(() => amiibo.imageUrl())
              .then(url => console.log('image url: ', url));
          })
          .then(() => {
            const ntag = new core.NTAG215(reader);
            return ntag.serialNumber()
              .then(sn => console.log('serial number: ', sn.toString('hex')))
              .then(() => Promise.all([ntag.memorySize(), ntag.fullDump()]))
              .then(([size, all]) => {
                console.log(`memory size`, size);
                console.dir(all);
              });
          })
          .catch(err => console.error('read error', err));
      });
})
.on('error', err => console.error('nfc error', err));
*/