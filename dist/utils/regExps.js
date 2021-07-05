"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.emailRegExp = exports.phoneRegExp = void 0;
// REGULARS EXPRESSIONS TO VALIDATE STRINGS
var phoneRegExp = /^\+\d{2,3}\s\d{9,11}$/;
exports.phoneRegExp = phoneRegExp;
var emailRegExp = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
exports.emailRegExp = emailRegExp;