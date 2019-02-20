'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  require('../lib/setStrategyTemplate')(app);

  router.get('/success', controller.auth.callback);

  app.passport.mount('UMA', { successRedirect: '/success' });
};
