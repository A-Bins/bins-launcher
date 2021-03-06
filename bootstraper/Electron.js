"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
var isDev = require("electron-is-dev");
var path = require("path");
// 1. GC가 일어나지 않도록 밖에 빼줌
function create_window() {
    var main_window = new electron_1.BrowserWindow({
        // 이것들은 제가 사용하는 설정이니 각자 알아서 설정 하십시오.
        center: true,
        width: 1200,
        height: 640,
        autoHideMenuBar: true,
        kiosk: !isDev,
        icon: path.join(__dirname, '../src/icon/icon.png'),
        resizable: true,
        backgroundColor: '#2d2d2d',
        minHeight: 640,
        minWidth: 1200,
        maxHeight: 640,
        maxWidth: 1200,
        show: false,
        frame: false,
        webPreferences: {
            // 2.
            // 웹 애플리케이션을 데스크탑으로 모양만 바꾸려면 안 해도 되지만,
            // Node 환경처럼 사용하려면 (Node에서 제공되는 빌트인 패키지 사용 포함)
            // true 해야 합니다.
            nodeIntegration: true,
            enableRemoteModule: true,
            webSecurity: false,
            preload: __dirname + '/preload.js'
        }
    });
    main_window.once('ready-to-show', function () {
        main_window.show();
    });
    // 3. and load the index.html of the app.
    if (isDev) {
        // 개발 중에는 개발 도구에서 호스팅하는 주소에서 로드
        main_window.loadURL('http://localhost:3000');
        main_window.webContents.openDevTools();
    }
    else {
        // 프로덕션 환경에서는 패키지 내부 리소스에 접근
        main_window.loadFile(path.join(__dirname, '../build/index.html'));
    }
    main_window.webContents.on('devtools-opened', function () {
        main_window.webContents.executeJavaScript("console.log('%c잠깐만요!!', 'font-size: 48px; color: red')");
        main_window.webContents.executeJavaScript("console.log('%c여기는 전쟁터입니다... 피하세요!! 이상한거 입력하면 계정이 털릴 수 있어요!', 'font-size: 24px;')");
        main_window.webContents.executeJavaScript("console.log('%c그러니까, 아무거나 복사 붙여넣기 하면 털릴 수 있어요...', 'font-size: 16px;')");
        main_window.webContents.executeJavaScript("console.log('%c이게 모른다면, %c그냥 하지 마세요', 'font-size: 16px;', 'font-size: 16px; font-weight: bold')");
    });
    // Emitted when the window is closed.
}
/*
const remote = require('electron').remote
const currentWindow = remote.getCurrentWindow()


function window_close() {
  currentWindow.close()
}

function window_minimize() {
  currentWindow.minimize()
}

function window_Max_or_unMax() {
  if(currentWindow.isMaximized()){
    currentWindow.unmaximize();
    return;
  }
  currentWindow.maximize()
}
*/
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
electron_1.app.on('ready', create_window);
// Quit when all windows are closed.
electron_1.app.on('window-all-closed', function () {
    electron_1.app.quit();
});
