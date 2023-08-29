const Mpesa = require('../../../models/mpesa')
const update = (req,res)=>{
    const { passkey,shortcode,tillnumber,authorization_key } = req.body;
    let data = new Mpesa({
        passkey:passkey,
        shortcode:shortcode,
        tillNumber:tillnumber,
        basicAuthorizationKey:authorization_key
    })
    data.save(()=>{
        req.flash('success','Mpesa configs updated successfully.');
        res.redirect('/admin/settings#navs-mpesa-api')
    })

}
module.exports = update;