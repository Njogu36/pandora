const SMS = require('../../../models/sms')
const update = (req,res)=>{
    const { sender_id,username,passkey } = req.body;
    let data = new SMS({
      username:username,
      passkey:passkey,
      sender_id:sender_id,
    })
    data.save(()=>{
        req.flash('success','SMS updated successfully.');
        res.redirect('/admin/settings#navs-email_sms_configs')
    })

}
module.exports = update;