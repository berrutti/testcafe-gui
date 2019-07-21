const { ipcRenderer } = require('electron');

let playButton = document.getElementById('play-button');
let stopButton = document.getElementById('stop-button');
let folderButton = document.getElementById('folder-button');
let homeButton = document.getElementById('home-button');

playButton.addEventListener('click', ()=>{
    ipcRenderer.send('play-clicked');
});

stopButton.addEventListener('click', ()=>{
    console.log('Pressed stop');
});

folderButton.addEventListener('click', ()=>{
    ipcRenderer.send('folder-clicked');
})

