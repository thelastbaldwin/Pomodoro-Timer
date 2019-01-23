module.exports = {
	"parser": "babel-eslint",
	"plugins": [ "react"],
	"extends" : ["eslint:recommended", "plugin:react/all", "airbnb"],
	"env" : {
		"commonjs" : true,
		"browser" : true,
		"es6" : true
	},
	"parserOptions": {
		"ecmaVersion": 2015,
		"sourceType" : "module",
		"ecmaFeatures" : {
			"jsx" : true
		}
	},
	"rules" : {
		"semi": 1,
		"quotes": ["error", "double"],
    "comma-dangle": ["error", "never"],
    "object-curly-spacing": ["error", "never"],
		"no-plusplus": 0,
    "no-console": 1,
    "no-debugger": 1,
    "no-unused-vars": 1,
		"react/no-set-state" : 0,
    "react/destructuring-assignment": 0,
    "react/require-default-props": 0,
    "react/no-unused-prop-types": 1,
    "arrow-body-style": ["error", "as-needed"]
	}
}