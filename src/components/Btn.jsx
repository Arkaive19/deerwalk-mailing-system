import React, { useState } from "react";
import config from "../../config.js";
import { signature } from "./utils/signature.js";
const Btn = () => {
  const [selectedDate, setSelectedDate] = useState("YYYY-MM-DD");
  const [dayOfWeek, setDayOfWeek] = useState("###day");
  const [previewed, setPreviewed] = useState(false);
  const [reason, setReason] = useState("Sickness");
  const [body, setBody] = useState(
    "I will be back to school as soon as possible."
  );
  let mailConsts = {
    fromSection: `'${config.NAME}' <${config.email_domain}>`,
    classTeacher: [`${config.CLASS_TEACHER}`],
    classTeacherName: config.CLASS_TEACHER.split("@")[0].replace(".", " "),
    subjectTeachers: Object.values(config.SUBJECT_TEACHERS),
  };
  let mailPresets = {
    "leave-request": {
      from: mailConsts.fromSection,
      to: mailConsts.classTeacher,
      cc: mailConsts.subjectTeachers,
      subject: `Leave Request For ${dayOfWeek} [${selectedDate}]`,
      html: `
      <br/> <em>Respected  ${mailConsts.classTeacherName},</em><br/><br/>
      I would like to inform you regarding my absence on ${dayOfWeek} [${selectedDate}] due to ${reason}.
      ${body}<br/>
      <br/>Sincerely,
      <br/> ${config.NAME}    
      <br/> ${signature}
      `,
    },
  };
  const sendMail = (type) => {
    let mailInfo = mailPresets[type];
    if (!previewed) {
      document.getElementById("mail-content").innerHTML =
        mailInfo.subject + "\n\n" + mailInfo.html;
      setPreviewed(true);
    } else {
      window.electronAPI.sendEmail(mailInfo);
      alert("Mail Sent Successfully");
      document.getElementById("mail-content").innerHTML = "";
      setPreviewed(false);
    }
  };
  const dateChange = (e) => {
    setSelectedDate(e.target.value);
    setDayOfWeek(
      new Date(e.target.value).toLocaleDateString("en-US", { weekday: "long" })
    );
  };

  return (
    <div>
      <button
        onClick={() => {
          document.getElementById("mail-content").innerHTML = "";
          setPreviewed(false);
        }}
      >
        Close Preview
      </button>

      <div id="mail-content" />
      <button onClick={() => sendMail("leave-request")}>
        {previewed ? "Send Leave Request" : "Preview Leave Request"}
      </button>
      <div>
        <label htmlFor="datePicker">Pick a date:</label>
        <input
          type="date"
          id="datePicker"
          value={selectedDate}
          onChange={dateChange}
        />
        <label htmlFor="reason">Reason:</label>
        <input
          type="text"
          id="reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
        <label htmlFor="body">Body:</label>
        <textarea
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        >
          {body}
        </textarea>
      </div>
    </div>
  );
};

export default Btn;
