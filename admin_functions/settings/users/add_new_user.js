const bcrypt = require('bcryptjs')
const User = require('../../../models/user');
const add_new_user = (req, res) => {
    const { first_name, last_name, email, password, password2, role } = req.body

    if (password !== password2) {
        req.flash('danger', 'Password mismatch');
        res.redirect('/admin/settings#navs-system-users')
    }
    else {
        User.findOne({ username: email }, (err, user) => {
            if (user) {
                req.flash('danger', 'User already exists');
                res.redirect('/admin/settings#navs-system-users')
            }
            else {
                let data = new User({
                    first_name: first_name,
                    last_name: last_name,
                    username: email,
                    phone_number: "",
                    role: role,
                    type: "Administrator",
                    password: password
                })
                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(password, salt, function (err, hash) {
                        data.password = hash
                        data.save((err, result) => {
                            req.flash('info', 'User added successfully.');
                            res.redirect('/admin/settings#navs-system-users')
                        })
                    })
                });
            }
        })



    }
}
module.exports = add_new_user;