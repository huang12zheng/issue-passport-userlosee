'use strict';
module.exports = app => {
  app.passport.serializeUser(async (ctx, user) => {
    return user._id;
  });
  app.passport.deserializeUser(async (ctx, id) => {
    // 5bffe1b36068ae525efc9d76
    // const user = await ctx.domain.get('User', id);
    // return user;

    return { _id: '123456' };
  });
};
