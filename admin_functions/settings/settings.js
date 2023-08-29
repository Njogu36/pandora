const User = require('../../models/user')
const Email = require('../../models/email')
const SMS = require('../../models/sms')
const Mpesa = require('../../models/mpesa');
const Category = require('../../models/category')
const icons = require('./icons')
const settings = (req,res)=>{
    User.find({type:"Administrator"},(err,users)=>{
        Email.findOne({},(err,email)=>{
            SMS.findOne({},(err,sms)=>{
                Mpesa.findOne({},(err,mpesa)=>{
                    Category.find({},(err,categories)=>{
                        res.render('./administrator/settings/settings.jade',{
                            user:req.user,
                            url:req.originalUrl,
                            sms,sms,
                            mpesa:mpesa,
                            email:email,
                            users:users,
                            categories:categories,
                            icons:icons.icons
    
                        })
                    })
                  
                })
            })
        })
    })
    
}
module.exports = settings