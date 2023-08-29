const passport = require('passport');

const login_post = passport.authenticate('User',{
    successRedirect:'/auth/check_user_type',
    failureRedirect:'/auth',
    failureFlash:true,
    session:true
})

module.exports = login_post