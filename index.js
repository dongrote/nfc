'use strict';

const pcsclite = require('pcsclite');
const pcsc = pcsclite();
pcsc
  .on('reader', reader => {
    console.log('new reader detected', reader.name);
    reader.on('error', console.error);
    reader.on('status', status => {
      const changes = reader.state ^ status.state;
      if (changes) {
        console.log('changes detected');
      } else {
        console.log('no changes detected');
      }
    });
    reader.on('end', () => console.log(`${reader.name} disconnected`));
  })
  .on('error', err => console.error('pcsc', err));
