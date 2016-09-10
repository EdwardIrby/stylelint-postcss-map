import ruleTester from 'stylelint-rule-tester';
import declarationUseVariable, { messages, ruleName } from '../lib';

const testRule = ruleTester(declarationUseVariable.rule, ruleName);

//Test Single CSS Property
testRule('color',
function(tr){
  tr.ok('.foo { color: map(colors, blue) }');
  tr.ok('.foo { background-color: blue }');
  tr.notOk('.foo { color: blue}', messages.expected('color'));
})

//Test Multiple CSS Properites
testRule(['color', 'width'],
function(tr){
  tr.ok('.foo { color: map(colors, blue) }');
  tr.ok('.foo { background-color: blue }');
  tr.ok('.foo { width: map(layout, appWidth)}');
  tr.ok('.foo { height: map(layout, panelHeight)}');
  tr.notOk('.foo { color: blue}', messages.expected('color'));
  tr.notOk('.foo { width: 200px}', messages.expected('width'));
})

//Test Single CSS Property with Exception
testRule('color', {color:"transparent"},
function(tr){
  tr.ok('.foo { color: map(colors, blue) }');
  tr.ok('.foo { color: transparent}');
  tr.ok('.foo { background-color: blue}');
  tr.notOk('.foo { color: red}', messages.expected('color'));
})

//Test Multiple CSS Properites with exceptions
testRule(['color', 'width', 'z-index'],
{
  "color": ["transparent"],
  "width": ["100%", "100vw"]
},
function(tr){
  tr.ok('.foo { color: map(colors, blue) }');
  tr.ok('.foo { color: transparent }');
  tr.ok('.foo { width: map(layout, appWidth)}');
  tr.ok('.foo { width: 100%}');
  tr.ok('.foo { width: 100vw}');
  tr.ok('.foo { z-index: map(zIndex, z1)}');
  tr.notOk('.foo { color: blue}', messages.expected('color'));
  tr.notOk('.foo { width: 200px}', messages.expected('width'));
  tr.notOk('.foo { z-index: 1}', messages.expected('z-index'));
})
