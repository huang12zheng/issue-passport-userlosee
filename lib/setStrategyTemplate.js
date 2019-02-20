'use strict';
// hint: just switch queryArg to {username, password}
// const LocalStrategy = require('passport-local').Strategy;
const Strategy = require('./strategy');
module.exports = app => {
  // 可以统一处理,直接数据库去查数据
  // Strategy.name = UMA
  app.passport.use(new Strategy());
  require('./defaultSerialize')(app);
};
