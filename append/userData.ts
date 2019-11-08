import Buffer from 'Buffer';
import { writeFileSync, readFileSync } from 'fs';
import { app, ipcMain } from 'electron';

export function init() {

  ipcMain.on('getUserData', () => {
    get();
  });

}

export function get() {

  console.log(app.getPath('userData'));

  return {};
}
