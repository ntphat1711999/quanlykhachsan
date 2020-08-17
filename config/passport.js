const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;

// models
const User = require('../models/User');

module.exports = (passport) => {
    passport.serializeUser((user, done) => done(null, user.id));

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => done(err, user));
    });

    // login
    passport.use('login', new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true
        },
        async (req, username, password, done) => {
            try {
                const user = await User.findOne({ username })
                if (!user) {
                    return done(null, false, { message: 'Username not found' });
                }
                const isMatch = await bcrypt.compare(password, user.password);
                isMatch ? done(null, user) : done(null, false, { message: 'Password incorrect' });
            } catch (error) {
                console.error(error.message);
            }
        }
    ))

    // register
    passport.use('register', new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true
        },
        async (req, username, password, done) => {
            try {
                const user = await User.findOne({ username });
                if (user) {
                    return done(null, false, { message: 'Username already exists' });
                }
                const checkEmail = await User.findOne({ email: req.body.email });
                if (checkEmail) {
                    return done(null, false, { message: 'Email already exists' });
                }
                // hash password
                const salt = await bcrypt.genSalt(10);
                const hashPassword = await bcrypt.hash(password, salt);
                // create new user
                const newUser = await new User({
                    username,
                    password: hashPassword,
                    email: req.body.email
                }).save();
                done(null, newUser);
            } catch (error) {
                console.error(error.message);
            }
        }
    ));
}