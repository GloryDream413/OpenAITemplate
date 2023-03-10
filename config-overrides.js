const { override,disableChunk, disableEsLint, addDecoratorsLegacy, } = require('customize-cra')

// const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

// const addMyPlugin = config => {

// 	console.log(`config`,config)


// 	function myOverrides(config) {
// 		// do stuff to config
// 		return config
// 	}
//   config.plugins.push(new MonacoWebpackPlugin())
//   return config
// }


// Adds legacy decorator support to the Webpack configuration.
module.exports = override(
	addDecoratorsLegacy(),
	disableEsLint(),
	disableChunk(),
	// addWebpackPlugin(new MonacoWebpackPlugin()),
)