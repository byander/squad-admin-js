import csv from 'csvtojson';
// const fs = require('fs');
import * as fs from 'fs';
console.log(fs);
const csvRules = '../data/rules.csv';

export const getRules = () => {
  console.log('rules');
  // csv({
  //   delimiter: '\n',
  // })
  //   .fromFile(csvRules)
  //   .then((jsonObj) => {
  //     console.log(jsonObj);
  //   });
};
