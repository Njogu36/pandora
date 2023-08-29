const bcrypt = require('bcryptjs');
const User = require('../models/user')
const login = (req, res) => {
     User.findOne({ username: "admin@pandoraprints.com",role:"Administrator",type:"Administrator" }, (err, user) => {
         
          if (user) {
               res.render('./authentication/login.jade')
          }
          else {
               let password = 'PPrints2023!'
               let data = new User({
                    first_name: "Pandora",
                    last_name: "Prints",
                    username: "admin@pandoraprints.com",
                    phone_number: "",
                    type: 'Administrator',
                    role: 'Administrator',
                    password: password,
               })
               bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(password, salt, function (err, hash) {
                         data.password = hash
                         data.save((err,result) => {
                              console.log(result)
                              res.render('./authentication/login.jade')
                         })
                    })
               });

          }
     })


}
module.exports = login