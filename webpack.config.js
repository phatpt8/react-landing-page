const path = require('path');

const cwd = process.cwd();

module.exports = webpackConfig => {
  const config = webpackConfig;
  config.resolve.extensions.push('.less');
  config.resolve.extensions.push('.js');
  config.resolve.alias = {
    // $config: path.join(cwd, 'src/config'),
    $assets: path.join(cwd, 'src/assets'),
    // $locales: path.join(cwd, 'src/locales'),
    $components: path.join(cwd, 'src/components'),
    $utils: path.join(cwd, 'src/utils'),
    // $styles: path.join(cwd, 'src/styles'),
    $routes: path.join(cwd, 'src/routes'),
    // $messages: path.join(cwd, 'src/messages'),
    $models: path.join(cwd, 'src/models'),
    $services: path.join(cwd, 'src/services'),
  };
  return config;
};
