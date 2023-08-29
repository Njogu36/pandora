const Product = require('../../models/product');
const Cart = require('../../models/cart');
const upload = (req, res) => {
    console.log(req.files);
    res.status(200).json({ success: true, message: 'Files uploaded successfully',files:req.files });
  
}
module.exports = upload