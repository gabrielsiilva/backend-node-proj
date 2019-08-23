const bcrypt = require('bcryptjs');
const passport = require('passport');
const axios = require('axios');

const jwt = require('jsonwebtoken');

const Dev = require('../models/dev.model');

module.exports = {
  async register(req, res) {
    try {
      const { username, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);

      const userExists = await Dev.findOne({ user: username });

      if (userExists) {
        return res.json({ message: 'User already exists!!' });
      }

      const response = await axios.get(`https://api.github.com/users/${username}`);
      const { login: name, bio, avatar_url: avatar } = response.data

      const newDev = await Dev.create({
        name,
        user: username,
        password: hashedPassword,
        bio,
        avatar
      });

      newDev.password = undefined;
      return res.json(newDev);

    } catch (error) {
      res.json({ message: `Error: ${error}` });
    }
  },

  authenticate(req, res, next) {

    passport.authenticate('local', (error, user, info) => {
      if (error) return res.status(403).json({ message: `Error: ${error}` });

      if (!user) return res.status(400).json({ message: info.message });

      user.password = undefined;
      const token = jwt.sign({ userId: user._id }, process.env.SECRET, { expiresIn: '2h' });

      return res.status(200).json({ auth: token });

    })(req, res, next);
  },

  verifyToken(req, res, next) {
    const token = req.headers['authorization'];
  
    if(!token) return res.status(401).json({ message: 'Unauthorized!' });
  
    jwt.verify(token, process.env.SECRET, (err) => {
      if (err) return res.status(500).json({ message: 'Invalid token.' });
      next();
    });
  }

}