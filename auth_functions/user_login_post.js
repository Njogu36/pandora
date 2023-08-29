const passport = require('passport');

const user_login_post = passport.authenticate('User',{
    successRedirect:'/auth/check_user_type',
    failureRedirect:'/auth',
    failureFlash:true,
    session:true
})

module.exports = user_login_post