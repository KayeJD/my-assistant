// preload.js - bridge between renderer and Electron main process
const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('api', {
  ping: () => console.log('pong'),
});
