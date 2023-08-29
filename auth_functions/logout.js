const User = require('../models/user')
const logout = (req, res) => {
   
    req.logout();
    res.redirect('/auth')
}
module.exports = logout