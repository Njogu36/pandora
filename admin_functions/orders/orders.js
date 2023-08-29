const orders = (req,res)=>{
    res.render('./administrator/orders/orders.jade',{
        user:req.user,
        url:req.originalUrl
    });
}
module.exports = orders