const createTestCafe = require('testcafe');
const { app, BrowserWindow } = require('electron');
const windowStateKeeper = require('electron-window-state');

let runner = null;
let mainWindow = null;

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
    // mainWindow.webContents.openDevTools();

    mainWindow.on('closed', ()=>{
        mainWindow = null;
    })
}

app.on('ready', createWindow);

app.on('window-all-closed', ()=>{
    if (process.platform !== 'darwin')
        app.quit();
})

// createTestCafe('localhost', 1337, 1338)
//     .then(testcafe => {
        
//         runner = testcafe.createRunner();

//         return runner
//             .src(['tests/fixture1.js'])
//             .browsers(['chrome'])
//             .run()
//             .then(failedCount => {
//                 console.log(failedCount);
//             })
//         });