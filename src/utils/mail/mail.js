import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import handlebars from "handlebars";
import config from "../../config";
// Mail Configurations
const createTransport = () => {
  const transport = nodemailer.createTransport({
    host: config.MAIL.HOST,
    port: config.MAIL.PORT,
    auth: {
      user: config.MAIL.USER,
      pass: config.MAIL.PASS,
    },
  });
  return transport;
};

const generateTemplate = (bodyTemplatePath, context) => {
  const mainTemplatePath = fs.readFileSync(
    path.join(__dirname, "/templates", "/main.hbs"),
    "utf-8"
  );
  const bodyTemplate = fs.readFileSync(bodyTemplatePath, "utf-8");
  handlebars.registerPartial("body", bodyTemplate);
  const compiledTemplate = handlebars.compile(mainTemplatePath);
  const compile = compiledTemplate(context);
  return compile;
};

const sendMail = async (toEmail, subject, template) => {
  const transport = createTransport();
  const mailSend = await transport.sendMail({
    from: config.MAIL.FROM,
    to: toEmail,
    subject: subject,
    html: template,
  });
  return 0;
};

// SendMail Actions

export const sendMailRegister = (toEmail, { name, lastName, password }) => {
  const registerTemplate = path.join(__dirname, "/templates", "/register.hbs");
  const template = generateTemplate(registerTemplate, {
    name,
    lastName,
    password,
  });
  fs.writeFileSync("index.html", template);
  const subject = `Hola ${name}, Bienvenido a la comunidad Empiretive`;
  sendMail(toEmail, subject, template);
};
