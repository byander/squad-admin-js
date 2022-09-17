import { boot } from 'quasar/wrappers';
import csv from 'csvtojson';

const csvRules = '../data/rules.csv';

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async (/* { app, router, ... } */) => {
  console.log(csvRules);
  csv({
    delimiter: '\n',
  })
    .fromFile(csvRules)
    .then((jsonObj) => {
      console.log(jsonObj);
    });
});
