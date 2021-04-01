const {app, BrowserWindow, ipcMain, Menu, screen} = require('electron')
const path = require('path')

function createWindow () {
  // Create the browser window.
  const { width, height } = screen.getPrimaryDisplay().workAreaSize
  const win = new BrowserWindow({
    width: 357,
    height: 357,
    x: width - 357 - 20,
    y: 40,
    titleBarStyle: 'hiddenInset',
    fullscreen: false,
    frame: true,
    resizable: false,
    transparent: false,
    show: false,
    webPreferences: {
      nodeIntegration: false,
      enableRemoteModule: true,
      contextIsolation: false,
      preload: path.join(app.getAppPath(), 'preload.js')
    }
  })
  
  win.loadFile('./index.html')
  // Building the menu bar
  // const menu = Menu.buildFromTemplate(template)
  // Menu.setApplicationMenu(menu)
  // Open the DevTools.
  // win.webContents.openDevTools()
win.webContents.on('did-finish-load', function() {
    let Start_Buffer_Time = 100;
    setTimeout(() => {win.show();},Start_Buffer_Time);
});
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

const isMac = process.platform === 'darwin'
const template = [
  ...(isMac ? [{
    label: app.name,
    submenu: [
      { role: 'about' },
      { role: 'hide' },
      { role: 'hideothers' },
      { role: 'unhide' },
      { type: 'separator' },
      { role: 'quit' },
    ]
  }] : []),
   {
     label: 'Window',
     submenu: [
       isMac ? { role: 'close' } : { role: 'quit' },  { role: 'minimize' }
     ]
   }
]
