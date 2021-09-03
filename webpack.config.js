const path = require("path");

module.exports = {
	entry: "./src/js/index.js",
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "app.bundle.js",
	},
	module: {
		rules: [
			{
				exclude: "/node_modules/",
				loader: "babel-loader",
			},
		],
	},
};
