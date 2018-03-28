const dest_dir = process.env.BUILD_DEST || "build";

export default {
  "entry": "src/index.js",
  "html": {
    "template": "./src/index.ejs",
    "inject": false,
  },
  "disableCSSModules": true,
  "outputPath": `./${dest_dir}`,
  "env": {
    "development": {
      "extraBabelPlugins": [
        "dva-hmr"
      ]
    },
    "production": {
      "extraBabelPlugins": [
        "transform-react-constant-elements"
      ]
    }
  },
  "extraBabelPlugins": [
    "transform-decorators-legacy",
    ["import", {
      "libraryName": "antd",
      "style": true
    }]
    // ,
    // ["react-intl", {
    //   "messagesDir": "./extracted-messages/"
    // }]
  ]
}