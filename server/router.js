const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/getMedia', mid.requiresLogin, controllers.Log.getMedia);
  app.get('/log', mid.requiresLogin, controllers.Log.logPage);

  app.get(
    '/login',
    mid.requiresSecure,
    mid.requiresLogout,
    controllers.Account.loginPage,
  );
  app.post(
    '/login',
    mid.requiresSecure,
    mid.requiresLogout,
    controllers.Account.login,
  );

  app.post(
    '/signup',
    mid.requiresSecure,
    mid.requiresLogout,
    controllers.Account.signup,
  );

  app.get('/logout', mid.requiresLogin, controllers.Account.logout);

  app.get('/maker', mid.requiresLogin, controllers.Log.makerPage);
  app.post('/maker', mid.requiresLogin, controllers.Log.makeMedia);

  // app.get("/update", mid.requiresLogin, controllers.Log.updatePage);
  // app.post("/update", mid.requiresLogin, controllers.Log.updateMedia);

  app.get(
    '/',
    mid.requiresSecure,
    mid.requiresLogout,
    controllers.Account.loginPage,
  );
  app.get('*', controllers.Log.notFoundPage);
};

module.exports = router;
