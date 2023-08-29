const express = require('express');
const router = express.Router();

const auth_user = require('../middleware/auth_user')

const check_user_type = require('../middleware/check_user_type')

const auth = require('../auth_functions/login.js')
const forgot_password = require('../auth_functions/forgot_password.js')
const register = require('../auth_functions/register.js')
const reset_password = require('../auth_functions/reset_password.js')
const login_post = require('../auth_functions/login_post');
const logout = require('../auth_functions/logout');
const register_user = require('../auth_functions/register_user')

router.get('/', auth)
router.post('/login', login_post)
router.get('/forgot_password', forgot_password)
router.get('/reset_password', reset_password)
router.get('/register/', register)
router.post('/register_user', register_user)

// CHECK USER TYPE
router.get('/check_user_type', auth_user, check_user_type)

// LOGOUT

router.get('/logout', auth_user, logout);
module.exports = router;