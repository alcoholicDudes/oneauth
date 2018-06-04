/**
 * Created by championswimmer on 07/05/17.
 */
const Raven = require('raven')
const GoogleStrategy = require('passport-google-oauth20').Strategy

const models = require('../../../db/models').models

const config = require('../../../../config')
const secrets = config.SECRETS
const passutils = require('../../../utils/password')

/**
 * Authenticate _users_ using their Github Accounts
 */

module.exports = new GoogleStrategy({
    clientID: secrets.GOOGLE_CONSUMER_KEY,
    clientSecret: secrets.GOOGLE_CONSUMER_SECRET,
    callbackURL: config.SERVER_URL + config.GOOGLE_CALLBACK,
    passReqToCallback: true
}, function (req, token, tokenSecret, profile, cb) {

    let profileJson = profile._json
    let oldUser = req.user
    Raven.setContext({extra: {file: 'googlestrategy'}})
    if (oldUser) {
        if (config.DEBUG) console.log('User exists, is connecting Google account')
        models.UserGoogle.findOne({where: {id: profileJson.id}})
            .then((goaccount) => {
                if (goaccount) {
                    throw new Error('Your Google account is already linked with codingblocks account Id: ' + goaccount.dataValues.userId)
                }
                else {
                    models.UserGoogle.upsert({
                        id: profileJson.id,
                        token: token,
                        tokenSecret: tokenSecret,
                        username: profileJson.displayName,
                        userId: oldUser.id
                    })
                        .then(function (updated) {
                            return models.User.findById(oldUser.id)
                        })
                        .then(function (user) {
                            return cb(null, user.get())
                        })
                        .catch((err) => Raven.captureException(err))
                }
            })
            .catch((err) => {
                cb(null, false, {message: err.message})
            })
    }
    else {
        models.User.count({where: {username: profileJson.displayName}})
            .then(function (existCount) {

                return models.UserGoogle.findCreateFind({

                    include: [models.User],
                    where: {id: profileJson.id},
                    defaults: {
                        id: profileJson.id,
                        token: token,
                        tokenSecret: tokenSecret,
                        username: profileJson.displayName,
                        user: {
                            username: existCount === 0 ? profileJson.displayName : profileJson.displayName + "-go",
                            firstname: profileJson.displayName ? profileJson.name.givenName : profileJson.displayName,
                            lastname: profileJson.displayName ? profileJson.name.familyName : "",
                            email: profileJson.emails[0].value,
                            photo: profileJson.image.url
                        }
                    }
                })
            }).spread(function (userGoogle, created) {
            //TODO: Check created == true for first time
            if (!userGoogle) {
                return cb(null, false, {message: 'Authentication Failed'})
            }
            return cb(null, userGoogle.user.get())
        }).catch((err) => {
            Raven.captureException(err)
        })
    }


})
