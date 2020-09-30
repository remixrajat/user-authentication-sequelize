"use strict";

var JWTStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const db = require("../models");

function hookJWTStrategy(passport) {
  var options = {};

  options.secretOrKey = process.env.TOKEN_SECRET;
  options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  options.ignoreExpiration = false;

  passport.use(
    new JWTStrategy(options, async (JWTPayload, callback) => {
      console.log(JWTPayload, "aaaaaaaaaaaaaaaaaaaaaaaaaa");
      const user = await db.User.findOne({ where: { id: JWTPayload.token } });
      if (!user) {
        callback(null, false);
        return;
      } else {
        callback(null, user);
      }
    })
  );
}
module.exports = hookJWTStrategy;
