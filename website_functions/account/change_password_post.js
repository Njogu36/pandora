const Product = require('../../models/product');
const Cart = require('../../models/cart');
const User = require('../../models/user');
const bcrypt = require('bcryptjs');
const  change_password_post = (req, res) => {
    const {password,password2} = req.body;
    if(password !== password2) {
        req.flash('danger','Passwords do not match.')
        res.redirect('/account/change_password')
    
    }
    else
    {
        let query = {
            _id:req.user.id
        }
        let data = {}
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, function (err, hash) {
                 data.password = hash
                 User.updateOne(query,data,(err) => {
                     req.flash('info','Password updated successfully.')
                    res.redirect('/account/change_password')
                 })
            })
       });
    }
    
}
module.exports = change_password_post