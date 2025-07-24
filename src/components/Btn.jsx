import React, { useState } from "react";
import config from "../../config.js";
const Btn = () => {
  const [selectedDate, setSelectedDate] = useState("YYYY-MM-DD");
  const [dayOfWeek, setDayOfWeek] = useState("###day");
  const [previewed, setPreviewed] = useState(false);
  const sendMail = (type) => {
    let signature = `
    --<br/>
        <img src="https://ci3.googleusercontent.com/mail-sig/AIorK4zu9_OVRpIIkW314N4HROdxXd0TWaDLZeSde4RFLI-blvQ0rS2JBe7HKiVxKmNy9wJT13yhUEk" alt="deerwalk-logo" /><br/>
        <strong>${config.NAME}</strong><br/>
        Class of ${config.CLASS} (${config.SECTION})<br/>
        <span style="color: #ea5d0f;">Deerwalk Sifal School | Sifal, Kathmandu</span><br/>
        ${config.CONTACT_NO} | <a href="https://deerwalk.edu.np/">deerwalk.edu.np</a><br/>
        <img src="https://ci3.googleusercontent.com/mail-sig/AIorK4yEr9R-f043IEGx9V-UeWL3aKUC0DtH37qnYAxYnsxTriZr8yqBg7KWfQaVSCkdEmi4pRhjvJQ" alt="fb-logo" />
         <img src="https://ci3.googleusercontent.com/mail-sig/AIorK4yyQB1rwPHFJo-ok-HsrgYiD_7wqX3TVCddA1yP2YgkrFljGXTfCyujw95gYYmf3rGFgO1yjEQ" alt="ln-logo" /> 
         <img src="https://ci3.googleusercontent.com/mail-sig/AIorK4w8rJUBliKnvrcbyN251odaZ5yswHFoGeygiIcu0DMEqbi0k4BECZtVP-KxKrU-qSzvy8gpNiA" alt="yt-logo" />
    `;
    let mailPresets = {
      "leave-request": {
        from: `'${config.NAME}' <${config.email_domain}>`,
        to: [`${config.CLASS_TEACHER}`],
        cc: Object.values(config.SUBJECT_TEACHERS),
        subject: `Leave Request For ${dayOfWeek} [${selectedDate}]`,
        html: `
        <em>Respected  ${config.CLASS_TEACHER.split("@")[0].replace(".", " ")},</em><br/>
        I would like to inform you regarding my absence on ${dayOfWeek} [${selectedDate}] due to a family gathering.<br/>
        I hope my reasoning satisfies the leave request and hope to hear from you soon.<br/>
        Sincerely,<br/>
        ${config.NAME}    
        <br/>
        ${signature}
        `,
      },
    };
    let mailInfo = mailPresets[type];
    if (!previewed) {
      document.getElementById("mail-content").innerHTML = mailInfo.html;
      setPreviewed(true);
    } else {
      window.electronAPI.sendEmail(mailInfo);
      setPreviewed(false);
    }
  };
  const dateChange = (e) => {
    setSelectedDate(e.target.value);
    setDayOfWeek(
      new Date(e.target.value).toLocaleDateString("en-US", {
        weekday: "long",
      })
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
        REFRESH
      </button>
      <div id="mail-content"></div>
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
      </div>
    </div>
  );
};

export default Btn;
