import ruleTester from 'stylelint-rule-tester';
import declarationUseVariable, { messages, ruleName } from '../lib';

const testRule = ruleTester(declarationUseVariable.rule, ruleName);

//Test for secondaryOptionObject exceptions
testRule(
  ['color', 'width', 'z-index'],
  { color: ['trasnparent'],
    width: ['100%', '100vw'],
    'z-index': ['1'],
  },
  function(tr){
  tr.ok('.foo { color: map(colors, blue) }');
  tr.ok('.foo { color: trasnparent}');
  tr.ok('.foo { display: block }');
  tr.ok('.foo { width: 100% }');
  tr.ok('.foo { width: 100vw}');
  tr.ok('.foo { z-index: map(zIndex, z1)}');
  tr.ok('.foo { z=index: 1}');
  tr.notOk('.foo { width:200px }', messages.expected('width'));
  tr.notOk('.foo { z-index: 2}', messages.expected('z-index'));
  tr.notOk('.foo { color: red}', messages.expected('color'));
})

//Test for just primaryOptions
testRule(
  ['color', 'width', 'z-index'],
  function(tr){
  tr.ok('.foo { color: map(colors, blue) }');
  tr.ok('.foo { width: map(layout, appWidth)}');
  tr.ok('.foo { z-index: map(zIndex, z1)}');
  tr.notOk('.foo { width:200px }', messages.expected('width'));
  tr.notOk('.foo { z-index: 1}', messages.expected('z-index'));
  tr.notOk('.foo { color: red}', messages.expected('color'));
})
