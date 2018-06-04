/**
 * Created by championswimmer on 08/03/17.
 */

const localStrategy = require('./strategy-local')

const fbStrategy = require('./strategy-facebook')

const twitterStrategy = require('./strategy-twitter')

const googleStrategy = require('./strategy-google')

const lmsStrategy = require('./strategy-lms')

module.exports = {localStrategy, fbStrategy, twitterStrategy, googleStrategy, lmsStrategy}