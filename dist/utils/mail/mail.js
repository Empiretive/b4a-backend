"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendMailRegister = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _handlebars = _interopRequireDefault(require("handlebars"));

var _config = _interopRequireDefault(require("../../config"));

// Mail Configurations
var createTransport = function createTransport() {
  var transport = _nodemailer["default"].createTransport({
    host: _config["default"].MAIL.HOST,
    port: _config["default"].MAIL.PORT,
    secure: _config["default"].MAIL.SECURE,
    auth: {
      user: _config["default"].MAIL.USER,
      pass: _config["default"].MAIL.PASS
    }
  });

  transport.verify().then(function (res) {
    console.log("Ready to Send Mails");
  });
  return transport;
};

var generateTemplate = function generateTemplate(bodyTemplatePath, context) {
  var mainTemplatePath = _fs["default"].readFileSync(_path["default"].join(__dirname, "/templates", "/main.hbs"), "utf-8");

  var bodyTemplate = _fs["default"].readFileSync(bodyTemplatePath, "utf-8");

  _handlebars["default"].registerPartial("body", bodyTemplate);

  var compiledTemplate = _handlebars["default"].compile(mainTemplatePath);

  var compile = compiledTemplate(context);
  return compile;
};

var sendMail = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(toEmail, subject, template) {
    var transport, mailSend;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            transport = createTransport();
            _context.next = 3;
            return transport.sendMail({
              from: _config["default"].MAIL.FROM,
              to: toEmail,
              subject: subject,
              html: template
            });

          case 3:
            mailSend = _context.sent;
            return _context.abrupt("return", 0);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function sendMail(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}(); // SendMail Actions


var sendMailRegister = function sendMailRegister(toEmail, _ref2) {
  var name = _ref2.name,
      lastName = _ref2.lastName,
      password = _ref2.password;

  var registerTemplate = _path["default"].join(__dirname, "/templates", "/register.hbs");

  var template = generateTemplate(registerTemplate, {
    name: name,
    lastName: lastName,
    password: password,
    link: _config["default"].APP.LINK
  });

  _fs["default"].writeFileSync("index.html", template);

  var subject = "Hola ".concat(name, ", Bienvenido a la comunidad Empiretive");
  sendMail(toEmail, subject, template);
};

exports.sendMailRegister = sendMailRegister;