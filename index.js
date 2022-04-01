const { app, BrowserWindow, screen, Menu } = require("electron");
const path = require("path");
const openAboutWindow = require("about-window").default;

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        "title": "webclient",
        "width": 1300,
        "height": 1000,
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
            { role:'minimize',  label:'最小化' },
            { type:'separator' },
            { role:'zoomin',  label:'拡大' },
            { role:'zoomout',  label:'縮小' },
            { role:'resetzoom',  label:'解除' },
    
          ]
        },
        {
          label: "検索",
          submenu: [
            { label:'Google', click: function() {mainWindow.loadURL("http://google.com/");} },
            { label:'Yahoo', click: function() {mainWindow.loadURL("http://yahoo.co.jp/");} },
            { label:'Bing', click: function() {mainWindow.loadURL("http://bing.com/");} },
            { type:'separator' },
            { label:'GoogleMap', click: function() {mainWindow.loadURL("http://google.co.jp/maps");} },
            { label:'Discord', click: function() {mainWindow.loadURL("http://discord.com/app");} },
            { label:'GitHub', click: function() {mainWindow.loadURL("http://github.com");} }
          ]
        },
        {
          label: "開発",
          submenu: [
            { label:'DevTools',role:'toggledevtools'}
          ]
        },
        {
          label: "ヘルプ",
          submenu: [
            { label:'Discord', click: function() {mainWindow.loadURL("https://discord.gg/GPs3npB63m");} }
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
