# amiibo

`amiibo` is an interface for reading and writing Amiibo bin files to NFC tags (NTAG215), written in node.js for ultimate speed and power.

## Install NodeJS 12 LTS

    sudo npm install n -g
    sudo n lts
    node --version
    
## Install pcscd

    sudo apt-get install pcscd
    
## Install amiitool

    git clone --recursive https://github.com/socram8888/amiitool
    cd amiitool && make && sudo cp amiitool /usr/local/bin/amiitool
    
## Install pcsc-lite development package

    sudo apt-get install libpcsclite-dev
    
## Build amiibo and react webui

    git clone https://github.com/dongrote/amiibo
    cd amiibo
    npm build-and-install
    # where your amiibo bin files are, no other files should be in this directory
    echo "AMIIBO_DIRECTORY=/path/to/amiibos" > .env
    # to get stack traces if things go wrong
    echo "DEBUG=*:error,*:info" >> .env
    # path to crypto key, exercise left up to the reader on where to get it
    echo "AMIITOOL_KEY_SET_FILE_PATH=/path/to/unfixed-fixed-keys.bin" >> .env 
    npm start
  
You should now be able to navigate to port 3000 to see a web interface for programming NFC tags with Amiibos!
