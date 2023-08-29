const User = require('../../models/user')
const customer_info_post  = (req,res)=>{
    let query = {
        _id:req.user.id
    }
    let data = {};
    data.first_name = req.body.FirstName;
    data.last_name = req.body.LastName;
    data.username = req.body.Email;
    data.company = req.body.Company;
    data.address_line_1 = req.body.StreetAddress;
    data.address_line_2 = req.body.StreetAddress2;
    data.town = req.body.City;
    data.country = req.body.CountryId;
    data.postcode = req.body.ZipPostalCode;
    data.phone_number = req.body.Phone;
    User.updateOne(query,data,()=>{
        req.flash('info','Updated successfully.');
        res.redirect('/account/customer_info')
    })


}
module.exports = customer_info_post