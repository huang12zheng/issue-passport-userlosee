'use strict';
/**
 * Module dependencies.
 */
const passport = require('passport-strategy');
const util = require('util');
const assert = require('assert');

async function defaultVerify(ctx, json, done) {
  function _check(json) {
    const Templates = [
      'userName,password', 'userName,SMS',
      'mobile,password', 'mobile,SMS',
    ];
    const keys = Object.keys(json).toString();
    for (const template of Templates) {
      if (template === keys) return true;
    }
    return false;
  }
  assert(_check(json), '[egg-passport-UMA] inputStyle is wrong');
  const existsUser = { _id: '123456' };
  // console.log(existsUser);
  ctx.login(existsUser);
  done(null, existsUser);
}

/** Strategy
 *
 * @param {Object} options some config, however, it is null
 * @param {Function} verify verify callback
 * @api public
 */
// preform
function Strategy(options, verify) {
  if (typeof options === 'function') {
    verify = options;
    options = {};
  }
  if (!options) {
    verify = defaultVerify;
    options = {};
  }
  if (!verify) {
    throw new TypeError('LocalStrategy requires a verify callback');
  }

  passport.Strategy.call(this);
  this.name = 'UMA';
  this._verify = verify;
  this._passReqToCallback = true;
}

/**
 * Inherit from `passport.Strategy`.
 */
util.inherits(Strategy, passport.Strategy);

Strategy.prototype.authenticate = function(req) {

  const self = this;
  // query is access json;
  const json = req.query;
  if (!json) {
    return this.fail({ message: 'Missing credentials' }, 400);
  }

  function verified(err, user, info) {
    if (err) {
      return self.error(err);
    }
    if (!user) {
      return self.fail(info);
    }
    self.success(user, info);
  }

  try {
    // if (self._passReqToCallback) {
    this._verify(req.ctx, json, verified);
  } catch (ex) {
    return self.error(ex);
  }
};

/**
 * Expose `Strategy`.
 */
module.exports = Strategy;
