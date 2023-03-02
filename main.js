const { app, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');

let mainWindow = null;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 1024,
        height: 680,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    })

    // 环境判断
    const urlLocation = isDev ? 'http://localhost:3000' : 'dummyUrl';
    mainWindow.loadURL(urlLocation);
    mainWindow.webContents.openDevTools(); // 打开调试工具
})