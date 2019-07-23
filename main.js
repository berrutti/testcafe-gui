const createTestCafe = require('testcafe');
const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const windowStateKeeper = require('electron-window-state');

let testcafeServer = null;
let runner = null;
let mainWindow = null;
let testFiles = null;
let browsers = null;

createTestCafe('localhost', 1337, 1338)
    .then(testcafe => {
        testcafeServer = testcafe;
        runner = testcafeServer.createRunner();
    });

function createWindow() {
    let state = windowStateKeeper({
        defaultWidth: 1000,
        defaultHeight: 800
    });

    mainWindow = new BrowserWindow({
        x: state.x,
        y: state.y,
        width: state.width,
        height: state.height,
        minWidth: state.width,
        minHeight: state.height,
        webPreferences: { nodeIntegration: true}
    })

    mainWindow.loadFile('./renderer/main.html');

    state.manage(mainWindow);
    mainWindow.webContents.openDevTools();

    mainWindow.on('closed', ()=>{
        mainWindow = null;
    })
}

app.on('ready', createWindow);

app.on('window-all-closed', ()=>{
    if (process.platform !== 'darwin') {
        if (testcafeServer) {
            testcafeServer.close();
        }
        app.quit();
    }
})

ipcMain.on('folder-clicked',e=>{
    const options = {
        title:'Open folder...',
        defaultPath:app.getPath('appData'),
        buttonLabel: 'Open',
        filters: [{
            name: 'Test Files',
            extensions: [
                'ts','js'
            ]
        }],
        properties: ['openFile', 'openDirectory', 'multiSelections'],
        message: 'Some message'
    }

    dialog.showOpenDialog(mainWindow,options,(filePaths)=>{
        testFiles = filePaths;       
    })
})

ipcMain.on('play-clicked',event=>{
    if (testFiles&&runner) {
        event.reply('tests-running');

        runner
            .src(testFiles)
            .browsers(['chrome'])
            .run()
            .then(failedCount => {
                event.reply('tests-finished');
                //console.log(failedCount
            })
            .catch(error => { 
                event.reply('tests-finished-errors');
                console.error(error);
            });
    }
});

ipcMain.on('stop-clicked',e=>{
    if (runner) {
        runner.stop();
    }
})