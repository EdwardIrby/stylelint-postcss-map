import ruleTester from 'stylelint-rule-tester';
import declarationUseVariable, { messages, ruleName } from '../lib';

const testRule = ruleTester(declarationUseVariable.rule, ruleName);

testRule(['color', 'width'], { except: ['1', '100%', '100vw', '100vh', '0', 'transparent']}, function(tr){
  tr.ok('.foo { color: map(colors, blue) }');
  tr.ok('.foo { display: block }');
  tr.ok('.foo { width: 100% }');
  tr.notOk('.foo { width:200px }', messages.expected('width'));
  tr.notOk('foo { color: blue}', messages.expected('color'));
})
// console.log(declarationUseVariable)
