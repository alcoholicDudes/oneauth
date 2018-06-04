/**
 * Created by piyush0 on 17/04/17.
 */
const router = require('express').Router()
const passport = require('../../passport/passporthandler')

router.get('/', passport.authorize('google'))

router.get('/callback', passport.authorize('google', {
    scope: ['profile', 'email'],
    failureRedirect: '/login',
    successReturnToOrRedirect: '/users/me'
}))

module.exports = router