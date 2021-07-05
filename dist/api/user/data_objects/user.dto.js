"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userDto = void 0;

var _lodash = require("lodash");

var _regExps = require("../../../utils/regExps");

var userDto = function userDto(_ref) {
  var dni = _ref.dni,
      name = _ref.name,
      lastName = _ref.lastName,
      email = _ref.email,
      role = _ref.role,
      photo = _ref.photo;
  var error = [];

  if ((0, _lodash.isEmpty)(dni) || !(0, _lodash.isString)(dni) || dni.length > 9 || dni.length < 7) {
    error.push("USER.REGISTER.ERROR.DNI");
  }

  if ((0, _lodash.isEmpty)(name) || !(0, _lodash.isString)(name)) {
    error.push("USER.REGISTER.ERROR.NAME");
  }

  if ((0, _lodash.isEmpty)(lastName) || !(0, _lodash.isString)(lastName)) {
    error.push("USER.REGISTER.ERROR.LAST_NAME");
  }

  if ((0, _lodash.isEmpty)(email) || !_regExps.emailRegExp.test(email)) {
    error.push("USER.REGISTER.ERROR.EMAIL");
  }

  if (error.length > 0) {
    return {
      error: error
    };
  } else {
    return {
      dni: dni,
      name: name,
      lastName: lastName,
      email: email,
      role: role,
      photo: photo
    };
  }
};

exports.userDto = userDto;