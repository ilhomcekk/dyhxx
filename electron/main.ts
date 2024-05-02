import {app, BrowserWindow, ipcMain,} from 'electron'
// @ts-ignore
import path from 'node:path'
import * as fs from "fs";


// ├─┬─┬ dist
// │ │ | index.html
// │ ├─┬ dist-electron
// │ │ ├ main.js
// │ │ └ preload.js

process.env.DIST = path.join(__dirname, '../dist');
process.env.VITE_PUBLIC = app.isPackaged ? process.env.DIST : path.join(process.env.DIST, '../public');

let win: BrowserWindow | null

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']

function createWindow() {
    win = new BrowserWindow({
        frame: false,
        resizable: false,
        fullscreen: true,
        transparent: true,
        icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            // nodeIntegration: true,
        },
    })

    // Test active push message to Renderer-process.
    win.webContents.on('did-finish-load', () => {
        win?.webContents.send('main-process-message', (new Date).toLocaleString())
    })

    // Open the DevTools in development mode
    if (process.env.NODE_ENV === 'development') {
        // win.webContents.openDevTools();
    }

    if (VITE_DEV_SERVER_URL) {
        win.loadURL(VITE_DEV_SERVER_URL)
    } else {
        // win.loadFile('dist/index.html')
        win.loadFile(path.join(process.env.DIST, 'index.html'))
    }
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
        win = null
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

ipcMain.on('print-command-request', (event, data) => {
    printHTMLContent(data);
    console.log(event);
});


function triggerEventInElectron(eventName: any, data: any) {
    win && win.webContents.send(eventName, data);
}

app.whenReady().then(() => {
    createWindow();
});


function createPrintWindow( htmlContent: any ) {

    const printWindow: any = new BrowserWindow({ 
        show: false,
        // width: 304,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
          }, 
        });

    const metaTag = '<meta name="viewport" content="width=device-width, initial-scale=1.0" />';

    const style = `
        <style>
        html, body {
            margin: 0 !important;
            padding: 0 !important;
            display: flex;
            align-items: flex-start;
            justify-content: center;
        }
        .check {
            width: 27mm;
        }
        .strong {
          font-family: "Monsterrat Bold";
          font-size: 1mm;
        }
        .check-welcome {
          font-size: 1.1mm;
          text-align: center;
          margin-bottom: 8px;
        }
        .check-id {
          font-size: 3mm;
          line-height: 1;
          font-weight: 900;
        }
        .check-qr-block {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 2rem;
          text-align: center;
        }
        .check-block {
          margin-bottom: 2px;
        }
        .check-text {
          font-size: 1mm;
          line-height: 1;
          margin-bottom: 4px;
        }
        .thanks {
          background: #000;
          padding: 6px;
          text-align: center;
          color: #fff;
          margin-top: 6px;
        }
        .qr {
          width: 160px;
          height: 160px;
        }
        
        .check-list {
          padding-left: 20px;
          list-style: auto;
        }
        .check-list li {
          line-height: 1.2;
        }
        </style>
    `;

    const contentWithStyle = `<html><head>${metaTag}${style}</head><body>${htmlContent}</body></html>`;

    printWindow.loadURL(`data:text/html;charset=utf-8,${ encodeURI( contentWithStyle ) }`);

    printWindow.webContents.on('did-finish-load', () => {

        // Print to PDF
        printWindow.webContents.printToPDF({}).then( (data: any) => {


            
                const tempPDFPath = '123123123.pdf';

                fs.writeFile(tempPDFPath, data, (error) => {

                    if (error) {
                        console.error('Failed to save PDF:', error);
                        return;
                    }

                    // Print the PDF
                    printWindow.webContents.print({ silent: true,  margins: {marginType: 'printableArea'}, pagesPerSheet: 1, copies: 1, filePath: tempPDFPath }, (error: any) => {
                    // printWindow.webContents.print({ silent: true, filePath: tempPDFPath }, (error) => {

                        if (error) {
                            console.error('Failed to print PDF:', error);
                        } else {
                            console.log('PDF printed successfully!');
                        }

                        // Delete the temporary PDF file
                        fs.unlink(tempPDFPath, (error) => {
                            if (error) {
                                console.error('Failed to delete temporary PDF file:', error);
                            }
                        });

                    });
                });
                // @ts-ignore
        }).catch(e => {
            console.log('Print to PDF');
            if (e) {
                console.error('Failed to generate PDF:', e);
                return;
            }
        });
    });

    return printWindow;

}


function printHTMLContent( htmlContent: any ) {
    createPrintWindow( htmlContent );
}


export default triggerEventInElectron;