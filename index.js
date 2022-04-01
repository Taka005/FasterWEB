const { app, BrowserWindow, screen, Menu } = require("electron");
const path = require("path");
const openAboutWindow = require("about-window").default;

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        "title": "webclient",
        "width": 1000,
        "height": 800,
        "icon": "icon.png",
        "autoHideMenuBar": false,
        "webPreferences": {
            //"preload": path.join(__dirname, "preload.js")
        }
    });

    Menu.setApplicationMenu(Menu.buildFromTemplate([
        {
          label: "ページ",
          submenu: [
            { label:'戻る', click: function() {history.back();} },
            { label:'進む', click: function() {history.back(1);} },
            { type:'separator' },
            { role:'quit', label:'終了' }
          ]
        },
        {
            label: "表示",
            submenu: [
              { role:'togglefullscreen',   label:'フルスクリーン' },
              { role:'minimize',  label:'最小化' }
            ]
          }
    ]));

    mainWindow.loadURL("http://google.com");
};

app.whenReady().then(() => {
    createWindow();

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});
