const auth_user = (req,res,next)=>{
    if(!req.user)
    {
        req.flash('danger', 'You must be logged in')
        res.redirect('/auth')
    }
    else
    {
        next()
    }
}
module.exports = auth_user