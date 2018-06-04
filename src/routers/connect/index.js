/**
 * Created by championswimmer on 05/05/17.
 */
/**
 * Created by championswimmer on 08/03/17.
 */
const router = require('express').Router()

router.use('/', require('./local'))
router.use('/facebook', require('./facebook'))
router.use('/twitter', require('./twitter'))
router.use('/google', require('./google'))

module.exports = router