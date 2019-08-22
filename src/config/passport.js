const LocalStrategy = require('passport-local');
const bcrypt = require('bcryptjs');

const MESSAGES = require('../utils/messages');

const Dev = require('../models/dev.model');

module.exports = (passport) => {
  passport.use(new LocalStrategy(async (username, password, done) => {

    const dev = await Dev.findOne({ user: username }).select('+password');

    if (!dev) {
      return done(null, false, { message: MESSAGES.NO_USER_FOUND });
    }

    try {

      await bcrypt.compare(password, dev.password) ?
        done(null, dev) :
        done(null, false, { message: MESSAGES.WRONG_PASSWORD })

    } catch (error) {
      return done(error);
    }
  }));

  passport.serializeUser((dev, done) => done(null, dev._id));
  passport.deserializeUser((id, done) => done(null, Dev.findById(id)));
}