const re =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export default (emails: any) => {
  const invalidEmails = emails
    .split(",")
    .map((email: any) => email.trim())
    .filter((email: any) => !re.test(email));

  if (invalidEmails.length) return `Invalid emails: ${invalidEmails}`;
};
