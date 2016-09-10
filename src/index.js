import stylelint from 'stylelint';
import  './includes.js';

const ruleName = 'plugin/stylelint-postcss-map';

const messages = stylelint.utils.ruleMessages(ruleName, {
  expected: (property) => `Expected variable for ${property}`,
})

const checkExceptions = (prop, value, options) => {
  const exceptions = options.hasOwnProperty(prop) ? options[prop] : [];
  return exceptions.includes(value);
};

const checkValue = (prop, value, options) => {
  if(checkExceptions(prop, value,  options)) return true;
  const regEx = /(map)|(calc\()|color(\()/g;
  return regEx.test(value);
}

const checkProp = (prop, primaryOptions) => primaryOptions.includes(prop)

const rule = stylelint.createPlugin(ruleName, function(primaryOptions, secondaryOptionObject){
  secondaryOptionObject = secondaryOptionObject || { };
  return (postcssRoot, postcssResult) =>{
    const validOptions = stylelint.utils.validateOptions(postcssResult, ruleName, { primaryOptions, secondaryOptionObject })
    if(!validOptions) return;
    postcssRoot.walk(function(statement){
      if(checkProp(statement.prop, primaryOptions) && !checkValue(statement.prop, statement.value, secondaryOptionObject)){
        stylelint.utils.report({
          ruleName: ruleName,
          result: postcssResult,
          node: statement,
          message: messages.expected(statement.prop),
        })
      }
    })
  }
})

rule.primaryOptionArray = true

export { rule as default };
export { ruleName as ruleName }
export { messages as messages }
