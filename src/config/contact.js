export const contactEmail = "pathak.work.2025@gmail.com";
const subject = "Project enquiry — portfolio";
const body = [
  "Hi Chinmoy,",
  "",
  "I would like to discuss a project with you.",
  "",
  "Name:",
  "Business / organisation:",
  "Project details:",
  "Existing website (if any):",
  "Budget range:",
  "Preferred timeline:",
  "Best way to reach me:",
  "",
  "Thank you!",
].join("\n");
export const gmailComposeUrl = `https://mail.google.com/mail/?${new URLSearchParams(
  {
    view: "cm",
    fs: "1",
    to: contactEmail,
    su: subject,
    body,
  },
)}`;
export const mailtoUrl = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
