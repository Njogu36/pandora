const User = require('../../../models/user');
const delete_user = (req, res) => {
    const { id } = req.params;
    User.findByIdAndDelete(id, (err) => {
        req.flash('danger', 'User removed successfully.');
        res.redirect('/admin/settings#navs-system-users')
    })
}
module.exports = delete_user