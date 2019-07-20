const createTestCafe = require('testcafe');
const { app, BrowserWindow } = require('electron');

let runner = null;
let mainWindow = null;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 800,
        webPreferences: { nodeIntegration: true}
    })

    mainWindow.loadFile('./renderer/index.html');

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

createTestCafe('localhost', 1337, 1338)
    .then(testcafe => {
        
        runner = testcafe.createRunner();

        return runner
            .src(['tests/fixture1.js'])
            .browsers(['chrome'])
            .run()
            .then(failedCount => {
                console.log(failedCount);
            })
        });