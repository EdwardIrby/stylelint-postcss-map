'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.messages = exports.ruleName = exports.default = undefined;

var _stylelint = require('stylelint');

var _stylelint2 = _interopRequireDefault(_stylelint);

require('./includes.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ruleName = 'plugin/stylelint-postcss-map';

var messages = _stylelint2.default.utils.ruleMessages(ruleName, {
  expected: function expected(property) {
    return 'Expected variable for ' + property;
  }
});

var defaultExceptions = ['calc', 'color'];

var checkExceptions = function checkExceptions(value, userExceptions) {
  var exceptions = defaultExceptions.concat(userExceptions);
  return exceptions.includes(value);
};

var checkValue = function checkValue(value, userExceptions) {
  if (checkExceptions(value, userExceptions)) return true;
  var regEx = /^(map)/g;
  return regEx.test(value);
};

var checkProp = function checkProp(prop, primaryOptions) {
  return primaryOptions.includes(prop);
};

var rule = _stylelint2.default.createPlugin(ruleName, function (primaryOptions, secondaryOptionObject) {
  return function (postcssRoot, postcssResult) {
    var validOptions = _stylelint2.default.utils.validateOptions(postcssResult, ruleName, { primaryOptions: primaryOptions, secondaryOptionObject: secondaryOptionObject });
    if (!validOptions) return;
    postcssRoot.walk(function (statement) {
      if (checkProp(statement.prop, primaryOptions) && !checkValue(statement.value, secondaryOptionObject.except)) {
        _stylelint2.default.utils.report({
          ruleName: ruleName,
          result: postcssResult,
          node: statement,
          message: messages.expected(statement.prop)
        });
      }
    });
  };
});

rule.primaryOptionArray = true;

exports.default = rule;
exports.ruleName = ruleName;
exports.messages = messages;