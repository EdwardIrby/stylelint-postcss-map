'use strict';

var _stylelintRuleTester = require('stylelint-rule-tester');

var _stylelintRuleTester2 = _interopRequireDefault(_stylelintRuleTester);

var _lib = require('../lib');

var _lib2 = _interopRequireDefault(_lib);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var testRule = (0, _stylelintRuleTester2.default)(_lib2.default.rule, _lib.ruleName);

//Test for secondaryOptionObject exceptions
testRule(['color', 'width', 'z-index'], { color: ['trasnparent'],
  width: ['100%', '100vw'],
  'z-index': ['1']
}, function (tr) {
  tr.ok('.foo { color: map(colors, blue) }');
  tr.ok('.foo { color: trasnparent}');
  tr.ok('.foo { display: block }');
  tr.ok('.foo { width: 100% }');
  tr.ok('.foo { width: 100vw}');
  tr.ok('.foo { z-index: map(zIndex, z1)}');
  tr.ok('.foo { z=index: 1}');
  tr.notOk('.foo { width:200px }', _lib.messages.expected('width'));
  tr.notOk('.foo { z-index: 2}', _lib.messages.expected('z-index'));
  tr.notOk('.foo { color: red}', _lib.messages.expected('color'));
});

//Test for just primaryOptions
testRule(['color', 'width', 'z-index'], function (tr) {
  tr.ok('.foo { color: map(colors, blue) }');
  tr.ok('.foo { width: map(layout, appWidth)}');
  tr.ok('.foo { z-index: map(zIndex, z1)}');
  tr.notOk('.foo { width:200px }', _lib.messages.expected('width'));
  tr.notOk('.foo { z-index: 1}', _lib.messages.expected('z-index'));
  tr.notOk('.foo { color: red}', _lib.messages.expected('color'));
});
