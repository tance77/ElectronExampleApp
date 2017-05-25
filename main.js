const electron             = require("electron");
const {app, BrowserWindow} = electron;

app.on("ready", function () {
    let mainWindow = new BrowserWindow(
        {
            width: 1300,
            height: 800,
            minWidth: 1281,
            minHeight: 800
        }
    );
    mainWindow.loadURL(`file://${__dirname}/main.html`);
    //mainWindow.webContents.openDevTools();
});

app.on("window-all-closed", () => {
    app.quit();
});

exports.openWindow = function () {
    let win = new BrowserWindow(
        {
            width:  1024,
            height: 1024
        }
    );
    win.loadURL(`file://${__dirname}/bear.html`);
};