const express = require('express');
const multer = require('multer');

const router = express.Router();

// UPLOAD IMAGES
var product_logos = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/product_logos')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})
var product_logos = multer({ storage: product_logos })



const auth_user = require('../middleware/auth_user.js')
const dashboard = require('../admin_functions/dashboard/dashboard')
const orders = require('../admin_functions/orders/orders')
const transactions = require('../admin_functions/transactions/transactions')
const customers = require('../admin_functions/customers/customers')

router.get('/', auth_user, dashboard)

router.get('/orders', auth_user, orders)
router.get('/transactions', auth_user, transactions)
router.get('/customers', auth_user, customers)

// Products Routes
const products = require('../admin_functions/products/products')
const add_new_product = require('../admin_functions/products/add_new_product')
const view_product = require('../admin_functions/products/view_product.js')
const edit_product = require('../admin_functions/products/edit_product.js')
const printing_pricing = require('../admin_functions/products/printing_pricing.js')
const update_image = require('../admin_functions/products/update_image.js')
router.get('/products', auth_user, products)
router.get('/products/view_product/:id', auth_user,view_product)
router.post('/products/add_new_product',auth_user,product_logos.single("file"),add_new_product)
router.post('/products/view_product/edit_product/:id',auth_user,edit_product)
router.post('/products/view_product/printing_pricing/:id',auth_user,printing_pricing)
router.post('/products/view_product/update_image/:id',auth_user,product_logos.single("file"),update_image)

// Settings routes
const settings = require('../admin_functions/settings/settings')
const mpesa_configuration = require('../admin_functions/settings/mpesa/update.js')
const email_configuration_update = require('../admin_functions/settings/email/update.js')
const sms_configuration_update = require('../admin_functions/settings/sms/update.js')
const add_new_user = require('../admin_functions/settings/users/add_new_user.js')
const delete_user = require('../admin_functions/settings/users/delete_user');
const edit_user = require('../admin_functions/settings/users/edit_user')
const add_new_category = require('../admin_functions/settings/printing/add_category.js')
const delete_category = require('../admin_functions/settings/printing/delete_category');
const add_new_sub_category = require('../admin_functions/settings/printing/add_sub_category')
const delete_sub_category = require('../admin_functions/settings/printing/delete_sub_category')

router.get('/settings', auth_user, settings)
router.get('/settings/delete_user/:id', auth_user, delete_user)
router.get('/settings/delete_category/:id',auth_user, delete_category)
router.get('/settings/delete_sub_category/:id/:no',auth_user, delete_sub_category)
router.post('/settings/mpesa_configuration',auth_user,mpesa_configuration);
router.post('/settings/email_configuration_update',auth_user,email_configuration_update);
router.post('/settings/sms_configuration_update',auth_user, sms_configuration_update)
router.post('/settings/add_new_user',auth_user, add_new_user)
router.post('/settings/edit_user',auth_user, edit_user)
router.post('/settings/add_new_category',auth_user, add_new_category)
router.post('/settings/add_new_sub_category',auth_user, add_new_sub_category)



module.exports = router;