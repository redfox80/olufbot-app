"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
function init() {
    electron_1.ipcMain.on('getUserData', function () {
        get();
    });
}
exports.init = init;
function get() {
    console.log(electron_1.app.getPath('userData'));
    return {};
}
exports.get = get;
//# sourceMappingURL=userData.js.map