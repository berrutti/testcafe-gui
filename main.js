const createTestCafe = require('testcafe');
const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const windowStateKeeper = require('electron-window-state');

let runner = null;
let mainWindow = null;
let testFiles = null;

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
    if (process.platform !== 'darwin')
        app.quit();
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

ipcMain.on('play-clicked',e=>{
    if (testFiles) {
        createTestCafe('localhost', 1337, 1338)
            .then(testcafe => {
                
                runner = testcafe.createRunner();

                return runner
                    .src(testFiles)
                    .browsers(['chrome'])
                    .run()
                    .then(failedCount => {
                        console.log(failedCount);
                    })
                });
    }
})