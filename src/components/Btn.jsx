import React from "react";
import config from "../config.js";
const Btn = () => {
  const sendMail = (type) => {
    let mailPresets = {
      "leave-request": {
        from: `'${config.NAME}' <${config.email_domain}>`,
        to: [`${config.CLASS_TEACHER}`],
        cc: Object.values(config.SUBJECT_TEACHERS),
        subject: "ABUI K HO YO",
        html: `<h1 style="background-color:green;">Hello gang world</h1>`,
      },
    };
    let mailInfo = mailPresets[type];
    window.electronAPI.sendEmail(mailInfo);
  };
  return (
    <div>
      <button onClick={sendMail("leave-request")}>Send Email</button>
    </div>
  );
};

export default Btn;
