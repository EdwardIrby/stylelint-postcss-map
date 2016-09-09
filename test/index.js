'use strict';

var _stylelintRuleTester = require('stylelint-rule-tester');

var _stylelintRuleTester2 = _interopRequireDefault(_stylelintRuleTester);

var _lib = require('../lib');

var _lib2 = _interopRequireDefault(_lib);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var testRule = (0, _stylelintRuleTester2.default)(_lib2.default.rule, _lib.ruleName);

testRule(['color', 'width'], { except: ['1', '100%', '100vw', '100vh', '0', 'transparent'] }, function (tr) {
  tr.ok('.foo { color: map(colors, blue) }');
  tr.ok('.foo { display: block }');
  tr.ok('.foo { width: 100% }');
  tr.notOk('.foo { width:200px }', _lib.messages.expected('width'));
  tr.notOk('foo { color: blue}', _lib.messages.expected('color'));
});
// console.log(declarationUseVariable)
