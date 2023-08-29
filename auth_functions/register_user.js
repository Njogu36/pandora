const User = require('../models/user')
const bcrypt = require('bcryptjs');
const register = (req, res) => {
    const { first_name, last_name, email, password, password2 } = req.body;
    if (password !== password2) {
        req.flash('danger','Password mismatch');
        res.redirect('/auth/register')
    }
    else
    {
        User.findOne({username:email},(err,user)=>{
            if(user)
            {
                req.flash('danger','User already exists');
                res.redirect('/auth/register')
            }
            else
            {
                let data = new User({
                    first_name:first_name,
                    last_name:last_name,
                    username:email,
                    phone_number:"",
                    role:'Self',
                    type:'User',
                    password: password,
                })
                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(password, salt, function (err, hash) {
                         data.password = hash
                         data.save((err,result) => {   
                            req.flash('info','Successfully registered, kindly login');
                            res.redirect('/auth/')
                         })
                    })
               });
            }
        })
       

    }

}
module.exports = register