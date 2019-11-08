import { app, BrowserWindow, screen, ipcMain, Tray, Menu } from 'electron';
import * as path from 'path';
import * as url from 'url';
import { init as UserDataInit } from './append/userData';

UserDataInit();

let win, serve;
const appp = {
  isQuitting: false,
};
const args = process.argv.slice(1);
serve = args.some(val => val === '--serve');

function createWindow() {

  const electronScreen = screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.
  win = new BrowserWindow({
    x: ((size.width / 2) - 300),
    y: ((size.height / 2) - 400),
    width: 600,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
    },
    icon: `${__dirname}/src/assets/favicon.ico`,
    title: 'Olufbot App',
  });

  if (serve) {
    require('electron-reload')(__dirname, {
      electron: require(`${__dirname}/node_modules/electron`)
    });
    win.loadURL('http://localhost:4200');
  } else {
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'dist/index.html'),
      protocol: 'file:',
      slashes: true
    }));
  }

  if (serve) {
    win.webContents.openDevTools({mode: 'detach'});
  }

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });

  win.on('close', (e) => {
    if (!appp.isQuitting) {
      e.preventDefault();
      win.hide();
    }
  });

  win.on('minimize', (e) => {
    e.preventDefault();
    win.hide();
  });

}

try {

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', createWindow);

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });

} catch (e) {
  // Catch Error
  // throw e;
}

let tray = null;

app.on('ready', () => {
  tray = new Tray(`${__dirname}/src/assets/favicon.ico`);
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Show', type: 'normal', click: () => { win.show(); }},
    { label: 'Quit', type: 'normal', click: () => {
      appp.isQuitting = true;
      app.quit();
    }},
  ]);

  tray.setToolTip('Olufbot App');
  tray.setContextMenu(contextMenu);

  tray.on('double-click', () => {
    win.show();
  });

});

ipcMain.on('hide', (event, arg) => {
  win.hide();
});
