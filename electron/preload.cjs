const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  sendEmail: (mailInfo) => ipcRenderer.send("send-mail", mailInfo),
});
