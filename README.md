# Deerwalk Mailing System

A desktop application for sending emails, built with Electron and React. Designed for DSS Students use, it allows users to send pre-configured emails (such as leave requests) with a single click.

---

## Features

- **Electron-based Desktop App**: Cross-platform desktop application using Electron.
- **React Frontend**: Modern UI built with React.
- **Pre-configured Email Templates**: Easily send emails (e.g., leave requests) to teachers or other contacts.
- **Gmail SMTP Integration**: Uses Nodemailer to send emails via Gmail.
- **Customizable User & School Info**: All sender/recipient info is configurable in `config.js`.

---

## Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/Arkaive19/deerwalk-mailing-system
   cd deerwalk-mailing-system-main
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Configure your details:**
   - Open `config.js` and fill in your name, email, password (app password for Gmail), roll number, class, section, club info, teachers, etc.

4. **Run the app in development mode:**
   ```sh
   npm run dev
   ```
   This will start both the Vite dev server and Electron.

---

## How TO USE 

- On launch, the app displays a button.
- Clicking the button sends a pre-configured email (e.g., a leave request) to the class teacher and CCs all subject teachers.
- Email sending is handled securely via Gmail SMTP using Nodemailer.

---

## Configuration

### Editing `config.js`

The `config.js` file contains all the information needed for sending emails and personalizing the app. Here’s what each field means and how to set it up:

```js
const config = {
  NAME: "Your Name", // Your full name
  email_domain: "your-email@gmail.com", // Your Gmail address (used as sender)
  email_password: "your-app-password", // Gmail App Password (see below)
  ROLL_NO: "your-roll-number", // Your roll number
  CLASS: "your-class", // Your class
  SECTION: "your-section", // Your section
  CLUB_NAME: "your-club-name", // (Optional) Your club name
  CLUB_ROLE: "your-club-role", // (Optional) Your role in the club
  CONTACT_NO: "your-contact-number", // (Optional) Your contact number
  FRIENDS: ["Friend 1", "Friend 2", "Friend 3"], // (Optional) List of friends
  SUBJECT_TEACHERS: {
    MATH: "math-teacher-email@example.com",
    SCIENCE: "science-teacher-email@example.com",
    ENGLISH: "english-teacher-email@example.com",
    NEPALI: "nepali-teacher-email@example.com",
  },
  CLASS_TEACHER: "class-teacher-email@example.com", // Class teacher's email
};
```

#### **How to set up Gmail SMTP (App Password)**

> **Important:** For security, you must use a Gmail App Password, not your regular Gmail password.

1. **Enable 2-Step Verification** on your Google account:  
   Go to [Google Account Security](https://myaccount.google.com/security) and turn on 2-Step Verification.

2. **Generate an App Password:**
   - Go to [App Passwords](https://myaccount.google.com/apppasswords) (after enabling 2-Step Verification).
   - Select "Mail" as the app and "Other" as the device (you can name it "Deerwalk Mailing System").
   - Click "Generate" and copy the 16-character password.
   - Paste this password into the `email_password` field in `config.js`.

3. **Set your Gmail address:**
   - Use your full Gmail address (e.g., `your-email@gmail.com`) in the `email_domain` field.

4. **Set recipient emails:**
   - Fill in the emails for your class teacher and subject teachers in the appropriate fields.

#### **Example `config.js`**

```js
const config = {
  NAME: "Ram Chandra Giri", // Your Name
  email_domain: "dummymail@gmail.com", // Example email
  email_password: "abcd efgh ijkl mnop", // Example app password
  ROLL_NO: "12", //Your Roll.no
  CLASS: "XI",// Your  Class
  SECTION: "Changla", // Your section
  CLUB_NAME: "Science Club", *optional // Your chosen club
  CLUB_ROLE: "President", *optional // Your role in club
  CONTACT_NO: "9800000000",
  FRIENDS: ["Friend 1", "Friend 2"],
  SUBJECT_TEACHERS: {
    MATH: "math.teacher@gmail.com",
    SCIENCE: "science.teacher@gmail.com",
    ENGLISH: "english.teacher@gmail.com",
    NEPALI: "nepali.teacher@gmail.com",
  },
  CLASS_TEACHER: "class.teacher@gmail.com",
};
```

---

## Troubleshooting

- **Email not sending?**
  - Double-check your Gmail address and App Password in `config.js`.
  - Make sure 2-Step Verification is enabled on your Google account.
  - Ensure you have not reached Gmail's daily sending limit.
  - Check your internet connection.
  - Look at the Electron app console for error messages.

- **App Password not working?**
  - Make sure you copied the password exactly (no spaces before/after).
  - App Passwords only work if 2-Step Verification is enabled.

- **Still not working?**
  - Try generating a new App Password.
  - Make sure your Google account is not blocking sign-ins from new locations/devices.

---

## Scripts

- `npm run dev` – Start the app in development mode (Vite + Electron)
- `npm run build` – Build the React frontend
- `npm run lint` – Lint the codebase

---

## Dependencies

- Electron
- React
- Nodemailer
- Vite
- Concurrently (for running dev servers together)
- ESLint (for linting)

---

