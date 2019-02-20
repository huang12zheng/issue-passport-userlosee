'use strict';

const Controller = require('egg').Controller;

class AuthController extends Controller {
  async callback() {
    const ctx = this.ctx;
    const user = ctx.user;
    ctx.body = {
      user,
    };
  }
}

module.exports = AuthController;
