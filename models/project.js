const mongoose = require('mongoose');
const ProjectSchema = mongoose.Schema({
    product_id:String,
    data:{},
    user_id:String,
    images:[],
    status:String
})
const Project = mongoose.model('Project', ProjectSchema);
module.exports = Project;