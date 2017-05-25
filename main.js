const electron = require("electron");

const {app, BrowserWindow} = electron;

const Process = require("./classes/process").Process;

app.on("ready", function () {
    let mainWindow = new BrowserWindow(
        {
            width:     1300,
            height:    800,
            minWidth:  1281,
            minHeight: 800
        }
    );
    mainWindow.loadURL(`file://${__dirname}/main.html`);
    mainWindow.webContents.openDevTools();

});

app.on("window-all-closed", () => {
    app.quit();
});

exports.openWindow = function () {

    let win = new BrowserWindow(
        {
            width:  1024,
            height: 1024
        }
    );
    win.loadURL(`file://${__dirname}/bear.html`);
};

exports.getProcesses = () => {
    return new Promise((resolve, reject) => {
        //Platform Windows
        if (process.platform === "win32") {
            let exec = require("child_process").exec;
            exec("tasklist /V /NH /FO CSV | SORT", function (err, stdout, stderr) {
                resolve(convertProcessList(stdout));
            });
        }
        //Platform Linux
        else {
            const child_process = require("child_process");

            const displayProcessBy = (pattern) => {
                let command = `ps -aux | grep ${pattern}`;
                child_process.exec(command, (err, stdout, stdin) => {
                    if (err) throw err;
                    console.log(stdout);
                });
            };
        }
    });
};

/**
 *
 * @param processString
 * @returns {Array}
 */
function convertProcessList(processString) {
        let processes       = processString.split("\r\n");
        let listOfProcesses = [];

        for (let i = 0; i < processes.length; i++) {
            let tmp         = processes[i].split("\",");
            let imageName   = tmp[0] ? tmp[0].replace(/"/,"") : null,
                PID         = tmp[1] ? tmp[1].replace(/"/,"") : null,
                sessionName = tmp[2] ? tmp[2].replace(/"/,"") : null,
                sessionNum  = tmp[3] ? tmp[3].replace(/"/,"") : null,
                memUsage    = tmp[4] ? tmp[4].replace(/"/,"") : null,
                status      = tmp[5] ? tmp[5].replace(/"/,"") : null,
                userName    = tmp[6] ? tmp[6].replace(/"/,"") : null,
                cpuTime     = tmp[7] ? tmp[7].replace(/"/,"") : null,
                windowTitle = tmp[8] ? tmp[8].replace(/"/,"") : null;
            listOfProcesses.push(new Process(imageName, PID, sessionName, sessionNum, memUsage, status, userName, cpuTime, windowTitle));
        }
        return listOfProcesses;
}