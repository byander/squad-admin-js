/**
 * This file is used specifically for security reasons.
 * Here you can access Nodejs stuff and inject functionality into
 * the renderer thread (accessible there through the "window" object)
 *
 * WARNING!
 * If you import anything from node_modules, then make sure that the package is specified
 * in package.json > dependencies and NOT in devDependencies
 *
 * Example (injects window.myAPI.doAThing() into renderer thread):
 *
 *   import { contextBridge } from 'electron'
 *
 *   contextBridge.exposeInMainWorld('myAPI', {
 *     doAThing: () => {}
 *   })
 */

const { contextBridge } = require('electron');

import sqlite3 from 'sqlite3';
import path from 'path';
const ExcelJS = require('exceljs');

// let dbPath = null;
let excelPath;
const workbook = new ExcelJS.Workbook();

if (process.env.DEBUGGING) {
  // dbPath = path.resolve('./database/database.db');
  excelPath = path.resolve('./database/dados.xlsx');
} else {
  // dbPath = path.resolve(process.resourcesPath, 'database', 'database.db');
  excelPath = path.resolve(process.resourcesPath, 'database', 'dados.xlsx');
}

// const db = new sqlite3.Database(dbPath, (err) => {
//   if (err) {
//     //console.log(err);
//   } else {
//     //console.log('db opened');
//   }
// });

// const getRulesData = () => {
//   const sql = 'SELECT * from rules order by id';
//   return new Promise(function (resolve, reject) {
//     db.serialize(() => {
//       db.all(sql, [], (err, rows) => {
//         if (!err) {
//           resolve(rows);
//         } else {
//           reject(err);
//         }
//       });
//     });
//   });
// };

async function getData(sheetName) {
  const data = [];
  await workbook.xlsx.readFile(excelPath).then(() => {
    const worksheet = workbook.getWorksheet(sheetName);
    const header = {};
    for (let i = 1; i <= worksheet.actualColumnCount; i++) {
      header[i] = worksheet.getRow(1).getCell(i).value;
    }
    for (let x = 2; x <= worksheet.actualRowCount; x++) {
      const row = {};
      for (let y = 1; y <= worksheet.actualColumnCount; y++) {
        row[header[y]] = worksheet.getRow(x).getCell(y).value;
      }
      data.push(row);
    }
  });
  return data;
}

// const getRules = () => {
//   return getRulesData();
// };

const getRules = () => {
  return getData('regras');
};

const getLayers = () => {
  return getData('layers');
};

const getMaps = () => {
  return getData('mapas');
};

const getGameMode = () => {
  return getData('gamemode');
};

const getMessages = () => {
  return getData('avisos');
};

const getCommands = () => {
  return getData('comandos');
};

const getReasonsKickBan = () => {
  return getData('motivos_kick_ban');
};

contextBridge.exposeInMainWorld('api', {
  setTitle: () => {
    console.log('doAthig');
  },
  getRules: getRules,
  getLayers: getLayers,
  getMaps: getMaps,
  getGameMode: getGameMode,
  getMessages: getMessages,
  getCommands: getCommands,
  getReasonsKickBan: getReasonsKickBan,
});
