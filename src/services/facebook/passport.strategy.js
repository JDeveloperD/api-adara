/**
 * @fileoverview passport.strategy.js, Estrategia para la autenticación con facebook
 * @version     1.0
 * @author      David Sandoval <ing.david1993@gmail.com>
 *
 * History
 * v1.0     -   creación del archivo http://www.passportjs.org/packages/passport-facebook/
 */
import passport from 'passport'
import passportFacebook from 'passport-facebook'
import User from 'components/users/model'
import { FACEBOOK_APP_ID, FACEBOOK_APP_SECRET } from 'config/secrets'

const FacebookStrategy = passportFacebook.Strategy

passport.use(new FacebookStrategy({
  clientID: FACEBOOK_APP_ID,
  clientSecret: FACEBOOK_APP_SECRET,
  callbackURL: 'http://localhost:3000/auth/facebook/callback'
},
function (accessToken, refreshToken, profile, cb) {
  User.findOrCreate({ facebookId: profile.id }, function (err, user) {
    return cb(err, user)
  })
}
))
