const { ipcRenderer } = require('electron');

let playButton = document.getElementById('play-button');
let stopButton = document.getElementById('stop-button');
let folderButton = document.getElementById('folder-button');
let homeButton = document.getElementById('home-button');

playButton.addEventListener('click', ()=>{
    ipcRenderer.send('play-clicked');
});

stopButton.addEventListener('click', ()=>{
    ipcRenderer.send('stop-clicked');
});

folderButton.addEventListener('click', ()=>{
    ipcRenderer.send('folder-clicked');
});

ipcRenderer.on('tests-running',event=>{
    console.log('Tests running!')
});

ipcRenderer.on('tests-finished',event=>{
    console.log('Tests finished!')
});

ipcRenderer.on('tests-finished-errors',event=>{
    console.log('Tests running!')
});