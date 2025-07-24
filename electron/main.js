import { app, BrowserWindow, Menu, ipcMain } from "electron";
import { join, dirname } from "path";
import process from "process";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";
import config from "../config.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: join(__dirname, "preload.cjs"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  if (app.isPackaged) {
    win.loadFile(join(__dirname, "../dist/index.html"));
  } else {
    win.loadURL("http://localhost:80");
    win.webContents.openDevTools();
  }

  // Example to maximize on startup instead of fullscreen:
  win.maximize();

  Menu.setApplicationMenu(null);
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

const transporterInfo = {
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: config.email_domain,  // Changed from MAIL_DOMAIN to email_domain
    pass: config.email_password // Changed from MAIL_API_KEY to email_password
  },
};

let sendEmail = async (mailInfo) => {
  try {
    let transporter = nodemailer.createTransport(transporterInfo);
    const result = await transporter.sendMail(mailInfo);
    console.log("Email sent successfully:", result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.log("Email sending failed:", error.message);
    console.log("Error code:", error.code);
    return { success: false, error: error.message };
  }
};

ipcMain.on("send-mail", async (event, mailInfo) => {
  const result = await sendEmail(mailInfo);
  event.reply("mail-status", result);
});
