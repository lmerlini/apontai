const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const session = require('express-session');
const User = require('./models/user');

const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use(session({
    secret: 'Q2y!d9jFf2@0yW^8zH!0sR&3dH1#9tU5',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
    async (username, password, done) => {
        try {
            const user = await User.findOne({ where: { username } });
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            const isValid = await bcrypt.compare(password, user.password);
            if (!isValid) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        } catch (error) {
            done(error);
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findByPk(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});


const {ensureAuthenticated} = require('./middlewares/ensureAuthenticated')
app.use('/auth', require('./routes/auth'));

app.use('/clients', ensureAuthenticated, require('./routes/clients'));
app.use('/work-entries', ensureAuthenticated, require('./routes/workEntries'));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});