const Manager = require('./queries');
const { contextBridge } = require('electron');

const getRules = () => {
  return Manager.getRules();
};

contextBridge.exposeInMainWorld('api', {
  getRules: getRules,
});
