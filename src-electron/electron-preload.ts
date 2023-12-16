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
import { BrowserWindow } from '@electron/remote';
import path from 'path';

const ExcelJS = require('exceljs');

let excelPath: string;
const workbook = new ExcelJS.Workbook();

if (process.env.DEBUGGING) {
  excelPath = path.resolve('./database/dados.xlsx');
} else {
  excelPath = path.resolve(process.resourcesPath, 'database', 'dados.xlsx');
}

async function getData(sheetName: string) {
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

async function insertData(sheetName: string, text: string) {
  console.log(sheetName);
  if (sheetName === '' || sheetName === undefined) {
    return;
  }
  await workbook.xlsx.readFile(excelPath).then(() => {
    const worksheet = workbook.getWorksheet(sheetName);
    const lastRow = worksheet.lastRow._number + 1;
    const row = worksheet.getRow(lastRow);
    row.getCell(1).value = text;
    row.commit();
    workbook.xlsx.writeFile(excelPath);
  });
}

async function deleteData(sheetName: string, rowNumber: number) {
  console.log(sheetName);
  if (sheetName === '' || sheetName === undefined) {
    return;
  }
  await workbook.xlsx.readFile(excelPath).then(() => {
    const worksheet = workbook.getWorksheet(sheetName);

    const lastRow = worksheet.lastRow._number;
    if (lastRow === rowNumber) {
      worksheet.spliceRows(rowNumber, 1, []);
    } else {
      worksheet.spliceRows(rowNumber, 1);
    }
    workbook.xlsx.writeFile(excelPath);
  });
}

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
  minimize() {
    BrowserWindow.getFocusedWindow().minimize();
  },

  toggleMaximize() {
    const win = BrowserWindow.getFocusedWindow();

    if (win.isMaximized()) {
      win.unmaximize();
    } else {
      win.maximize();
    }
  },

  close() {
    BrowserWindow.getFocusedWindow().close();
  },

  opacity(value: number) {
    const win = BrowserWindow.getFocusedWindow();
    if (win.isAlwaysOnTop() === false) {
      return;
    }
    win.setOpacity(value);
  },

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
  insertData: insertData,
  deleteData: deleteData,
});
