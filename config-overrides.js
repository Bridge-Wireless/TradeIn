module.exports = function override(config) {
    if (config.devServer) {
      config.devServer.setupMiddlewares = (middlewares, devServer) => {
        devServer.app.get('/some/path', (req, res) => {
          res.json({ message: 'Hello World' });
        });
        return middlewares;
      };
    }
    return config;
  };
  