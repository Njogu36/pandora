const Email = require('../../../models/email')
const update = (req,res)=>{
    const { email,port,password,host } = req.body;
    let data = new Email({
      email:email,
      port:port,
      host:host,
      password:password
    })
    data.save(()=>{
        req.flash('success','Email updated successfully.');
        res.redirect('/admin/settings#navs-email_sms_configs')
    })

}
module.exports = update;