/**
 * @fileoverview passport.strategy.js, Estrategia para la autenticación con google
 * @version     1.0
 * @author      David Sandoval <ing.david1993@gmail.com>
 *
 * History
 * v1.0     -   creación del archivo http://www.passportjs.org/packages/passport-google-oauth20/
 */
import passport from 'passport'
import passportGoogleOauth20 from 'passport-google-oauth20'
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from 'config/secrets'
import User from 'components/users/model'

const GoogleStrategy = passportGoogleOauth20.Strategy

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://www.example.com/auth/google/callback'
},
function (accessToken, refreshToken, profile, cb) {
  User.findOrCreate({ googleId: profile.id }, function (err, user) {
    return cb(err, user)
  })
}))
