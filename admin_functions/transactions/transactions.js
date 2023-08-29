const transactions = (req,res)=>{
    res.render('./administrator/transactions/transactions.jade',{
        user:req.user,
        url:req.originalUrl
    })
}
module.exports = transactions