# stylelint-postcss-map
---
This Stylelint plugin checks for the use of [postcss-map](https://github.com/pascalduez/postcss-map) variables in your css. It was inspired by [stylelint-declaration-use-variable](https://github.com/sh-waqar/stylelint-declaration-use-variable).

## Installation
---
```
npm install stylelint-postcss-map
```
Compatible with Stylelint v3+

## Usage
---
Add `stylelint-postcss-map` to `plugins` and `rules` array as demonstrated in the examples below.  

#### Single CSS Property
```js
//.stylelintrc
{
  "plugins": [
    "stylelint-postcss-map"
  ],
  "rules": [
    "plugin/stylelint-postcss-map": "color"
  ]
}
```

Note that your [primary option](http://stylelint.io/user-guide/configuration/#rules) must be passed in as a `nested array` for multiple CSS properties.
### Multiple CSS Properties
```js
//.stylelintrc
{
  "plugins": [
    "stylelint-postcss-map"
  ],
  "rules": [
    "plugin/stylelint-postcss-map": [["color", "width"]]
  ]
}
```

Additionally you can also configure exceptions for listed CSS properties in your rule configuration. Say for example, you don't wish to require the use of a variable for `width` values of `100%` or `100vw`.

### Single CSS Property with Exception.
```js
//.stylelintrc
{
  "plugins": [
    "stylelint-postcss-map"
  ],
  "rules": [
    "plugin/stylelint-postcss-map": [
      "width",
      {
        "width":["100%", "100vw"]
      }
    ]
  ]
}
```

You are `not required` to provide exception values for all listed CSS properties. In the example below only `color` and `width` have exceptions while `z-index` always requires a postcss-map variable.
### Multiple CSS Properties with Exceptions
```js
//.stylelintrc
{
  "plugins": [
    "stylelint-postcss-map"
  ],
  "rules": [
    "plugin/stylelint-postcss-map": [
      ["color", "width", "z-index"],
      {
        "color": ["transparent"],
        "width": ["100%", "100vw"]
      }
    ]
  ]
}
```

## Default Exceptions
---
CSS values `color()` and `calc()` are default value exceptions. If a line starts with either values the plugin will see it as valid.
```css
.foo {
  background-color: color( red a(90%));
  width: calc(2px + 2px);
}
```
