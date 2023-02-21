import { app, BrowserWindow, nativeTheme, globalShortcut } from 'electron';
import { initialize, enable } from '@electron/remote/main';
import path from 'path';
import os from 'os';

let onTop = false;

initialize();

// needed in case process is undefined under Linux
const platform = process.platform || os.platform();

try {
  if (platform === 'win32' && nativeTheme.shouldUseDarkColors === true) {
    require('fs').unlinkSync(
      path.join(app.getPath('userData'), 'DevTools Extensions')
    );
  }
} catch (_) {}

let mainWindow: BrowserWindow | undefined;

// let window = { x: 0, y: 0 }; // Saved previous window position
// let screen = electron.screen.getDisplayNearestPoint({
//   x: window.x,
//   y: window.y,
// });
// if (
//   !(window.x > screen.bounds.x && window.x < screen.size.width) ||
//   !(window.y > screen.bounds.y && window.y < screen.size.height)
// ) {
//   // The requested position cannot be accesible so the nearest point is applied
//   window.x = screen.bounds.x;
//   window.y = screen.bounds.y;
// }

export const position = () => {
  const window = { x: 0, y: 0 }; // Saved previous window position
  const { screen } = require('electron');
  const screen2 = screen.getDisplayNearestPoint({
    x: window.x,
    y: window.y,
  });
  if (
    !(window.x > screen2.bounds.x && window.x < screen2.size.width) ||
    !(window.y > screen2.bounds.y && window.y < screen2.size.height)
  ) {
    // The requested position cannot be accesible so the nearest point is applied
    window.x = screen2.bounds.x;
    window.y = screen2.bounds.y;
  }
  // Create a window that fills the screen's available work area.
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.workAreaSize;

  return {
    x: window.x,
    y: window.y,
    width: width / 2,
    height: height,
  };
};

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    icon: path.resolve(__dirname, 'icons/icon.png'), // tray icon

    width: position().width,
    height: position().height,
    x: position().x,
    y: position().y,
    frame: false,

    useContentSize: true,
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true, //coloquei
      // More info: https://v2.quasar.dev/quasar-cli-vite/developing-electron-apps/electron-preload-script
      preload: path.resolve(__dirname, process.env.QUASAR_ELECTRON_PRELOAD),
    },
  });

  enable(mainWindow.webContents);

  mainWindow.loadURL(process.env.APP_URL);

  mainWindow.setMenu(null);

  if (process.env.DEBUGGING) {
    // if on DEV or Production with debug enabled
    mainWindow.webContents.openDevTools();
  } else {
    // we're on production; no access to devtools pls
    mainWindow.webContents.on('devtools-opened', () => {
      mainWindow?.webContents.closeDevTools();
    });
  }

  mainWindow.webContents.session.webRequest.onHeadersReceived(
    { urls: ['*://*/*'] },
    (d, c) => {
      if (d.responseHeaders['X-Frame-Options']) {
        delete d.responseHeaders['X-Frame-Options'];
      } else if (d.responseHeaders['x-frame-options']) {
        delete d.responseHeaders['x-frame-options'];
      }
      c({ cancel: false, responseHeaders: d.responseHeaders });
    }
  );

  mainWindow.on('closed', () => {
    mainWindow = undefined;
  });
}

app
  .whenReady()
  .then(() => {
    // Atalho
    globalShortcut.register('Alt+V', () => {
      if (onTop === false) {
        if (!mainWindow.isFocused()) {
          mainWindow.minimize();
          mainWindow.restore();
          mainWindow.focus();
          mainWindow.show();
        }
        mainWindow.setAlwaysOnTop(true, 'floating');
        mainWindow.setOpacity(0.7);
        onTop = true;
      } else {
        mainWindow.minimize();
        mainWindow.restore();
        mainWindow.blur();
        mainWindow.setAlwaysOnTop(false);
        mainWindow.setOpacity(1);
        onTop = false;
      }
    });
  })
  .then(createWindow);

app.on('window-all-closed', () => {
  if (platform !== 'darwin') {
    app.quit();
  }
});

app.commandLine.appendSwitch('lang', 'en-US');
app.on('activate', () => {
  if (mainWindow === undefined) {
    createWindow();
  }
});
