module.exports = {
  "root": true,
  "extends": "airbnb",
  "parserOptions": {
    "ecmaVersion": 6
  },
  "env": {
    "browser": true,
    "node": true,
    "es6": true,
    "mocha": true
  },
  "rules": {
    "one-var": 0,
    "one-var-declaration-per-line": 0,
    "new-cap": 0,
    "consistent-return": 0,
    "no-param-reassign": 0,
    "comma-dangle": 0,
    "curly": [
      "error",
      "multi-line"
    ],
    "import/no-unresolved": "off",
    "import/extensions": "off",
    "no-shadow": [
      "error",
      {
        "allow": [
          "req",
          "res",
          "err"
        ]
      }
    ],
    "valid-jsdoc": [
      "error",
      {
        "requireReturn": true,
        "requireReturnType": true,
        "requireParamDescription": false,
        "requireReturnDescription": true
      }
    ],
    "indent": [
      "error",
      2
    ],
    "max-len": [
      "error",
      80
    ],
    "require-jsdoc": [
      "error",
      {
        "require": {
          "FunctionDeclaration": true,
          "MethodDefinition": true,
          "ClassDeclaration": true
        }
      }
    ]
  }
}
