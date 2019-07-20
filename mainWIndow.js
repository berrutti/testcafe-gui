const { BrowserWindow } = require('electron');

exports.win

exports.createWindow = () => {
    this.win = new BrowserWindow({
        width: 1000,
        minWidth: 1000,
        maxWidth: 1000,
        height: 800,
        minHeight: 800,
        maxHeight: 800
    })

    this.win.webContents.openDevTools();

    this.win.loadURL(`file://${__dirname}/renderer/main.html`);

    this.win.on('closed',()=> {
        this.win = null;
    })
}