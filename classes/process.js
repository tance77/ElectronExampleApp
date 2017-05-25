exports.Process = class{
    constructor(imageName, PID, sessionName, sessionNum, memoryUsage, status, userName, cpuTime, windowTitle){
        this.imageName = imageName;
        this.PID = PID;
        this.sessionName = sessionName;
        this.seessionNum = sessionNum;
        this.memoryUssage = memoryUsage;
        this.processStatus = status;
        this.userName = userName;
        this.cpuTime = cpuTime;
        this.windowTitle = windowTitle;
    }
};