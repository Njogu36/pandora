const dashboard = (req,res)=>{
    res.render('./administrator/dashboard/dashboard.jade',{
        user:req.user,
        url:req.originalUrl
    })
}
module.exports = dashboard