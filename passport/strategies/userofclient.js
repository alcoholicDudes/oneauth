/**
 * Created by championswimmer on 11/03/17.
 */

const BearerStrategy = require('passport-http-bearer').Strategy;

const models = require('../../db/models').models;

const bearerStrategy = new BearerStrategy(function(token, done) {
    models.AuthToken.findOne({
        where: {token: token},
        include: [models.User, models.Client]
    }).then(function(authToken) {
        if (!authToken) {
            return done(null, false);
        }
        let info = {
            scope: authToken.scope,
            explicit: authToken.explicit
        };
        return done (null, user, info);
    })
});

module.exports = {
    bearerStrategy
};