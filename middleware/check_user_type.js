// MODELS

const check_user_type = (req, res) => {
    console.log(req.user)
    if (req.user.type === 'Administrator') {
        res.redirect('/admin')
    }
    else if(req.user.type === 'User')
    {
        res.redirect('/')
    }

}
module.exports = check_user_type;