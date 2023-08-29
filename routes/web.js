const express = require('express');
const multer =require('multer');
const router = express.Router();

const auth_user = require('../middleware/auth_user')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // Specify the directory where you want to save the uploaded files
      cb(null, 'uploads/projects');
    },
    filename: function (req, file, cb) {
      // Specify a unique filename for each uploaded file
      cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname);
    }
  });
  
  const project_upload = multer({ storage: storage });
// login
const login = require('../website_functions/login/login')
router.get('/login', login)

// cart
const cart = require('../website_functions/cart/cart')
const delete_product_from_cart = require('../website_functions/cart/delete_product_from_cart')
const add_to_cart = require('../website_functions/cart/add_to_cart');
const add_to_cart_2 = require('../website_functions/cart/add_to_cart_2')
const upload  = require('../website_functions/cart/upload');
const upload_file = require('../website_functions/cart/upload_file')
const save_as_project = require('../website_functions/cart/save_as_project')
const remove_pending_projects = require('../website_functions/cart/remove_pending_projects')
router.get('/cart', cart)
router.get('/cart/upload/:id/:data',auth_user,upload)
router.get('/cart/remove_pending_projects/:id',auth_user,remove_pending_projects)
router.get('/delete_product_from_cart/:id',auth_user,delete_product_from_cart)
router.post('/product/add_to_cart/:id',auth_user,add_to_cart)
router.post('/cart/add_to_cart_2',auth_user,add_to_cart_2)
router.post('/cart/upload', project_upload.array('files'),upload_file);
router.post('/cart/save_as_project',auth_user, save_as_project)

// account
const customer_info = require('../website_functions/account/customer_info')
const addresses = require('../website_functions/account/addresses')
const orders = require('../website_functions/account/orders')
const change_password = require('../website_functions/account/change_password')
const saved_projects = require('../website_functions/account/saved_projects')
const add_new_address = require('../website_functions/account/add_new_address')
const customer_info_post = require('../website_functions/account/customer_info_post')
const change_password_post = require('../website_functions/account/change_password_post')
const logout = require('../website_functions/account/logout')
router.get('/logout',logout)
router.get('/account/customer_info',auth_user,customer_info)
router.get('/account/addresses',auth_user,addresses)
router.get('/account/orders',auth_user,orders)
router.get('/account/change_password',auth_user,change_password)
router.get('/account/saved_projects',auth_user,saved_projects)
router.get('/account/add_new_address',auth_user,add_new_address)
router.post('/account/customer_info_post',auth_user,customer_info_post)
router.post('/account/change_password_post',auth_user,change_password_post)

// checkout
const billing_details = require('../website_functions/checkout/billing_details');
const delivery = require('../website_functions/checkout/delivery');
const checkout = require('../website_functions/checkout/checkout');
const confirm_payment = require('../website_functions/checkout/confirm_payment')

router.get('/billing_details',auth_user,billing_details)
router.get('/delivery',auth_user,delivery)
router.get('/checkout',auth_user,checkout)
router.get('/confirm_payment',auth_user,confirm_payment)
// search
const search = require('../website_functions/search/search')
const search_post = require('../website_functions/search/search_post')
router.get('/search', search)
router.post('/search_post', search_post)


// home menu
const home = require('../website_functions/home/home')
router.get('/', home)

// product menu
const view_product = require('../website_functions/products/view_product');
const brochures_and_booklets = require('../website_functions/products/brochures_and_booklets');
const wall_calenders = require('../website_functions/products/wall_calenders');
const desk_calenders = require('../website_functions/products/desk_calenders');
const tote_bags = require('../website_functions/products/tote_bags');
const compliment_slips = require('../website_functions/products/compliment_slips');
const display_boards = require('../website_functions/products/display_boards');
const folders = require('../website_functions/products/folders');
const flags = require('../website_functions/products/flags');
const leaflets_flyers_and_invites = require('../website_functions/products/leaflets_flyers_and_invites');
const leaflets_folded = require('../website_functions/products/leaflets_folded');
const letterheads = require('../website_functions/products/letterheads');
const tshirts = require('../website_functions/products/tshirts');
const posters = require('../website_functions/products/posters');
const roller_banners = require('../website_functions/products/roller_banners');
const transparent_roller_banner_guards = require('../website_functions/products//transparent_roller_banner_guards');
const stickers_and_labels = require('../website_functions/products/stickers_and_labels');
const stickers_and_vinyls = require('../website_functions/products/stickers_and_vinyls');
const pvc_banners = require('../website_functions/products/pvc_banners');
const wrapping_paper = require('../website_functions/products/wrapping_paper');
const free_sample_pack = require('../website_functions/products/free_sample_pack');
const christmas_products = require('../website_functions/products/christmas_products')

router.get('/product/:name/',view_product)
router.get('/brochures_and_booklets',brochures_and_booklets);
router.get('/wall_calenders',wall_calenders);
router.get('/desk_calenders',desk_calenders);
router.get('/tote_bags',tote_bags);
router.get('/compliment_slips',compliment_slips);
router.get('/display_boards',display_boards);
router.get('/folders',folders);
router.get('/flags',flags);
router.get('/leaflets_flyers_and_invites',leaflets_flyers_and_invites)
router.get('/leaflets_folded',leaflets_folded);
router.get('/letterheads',letterheads);
router.get('/tshirts',tshirts);
router.get('/posters',posters);
router.get('/roller_banners',roller_banners);
router.get('/transparent_roller_banner_guards',transparent_roller_banner_guards)
router.get('/stickers_and_labels',stickers_and_labels);
router.get('/stickers_and_vinyls',stickers_and_vinyls)
router.get('/pvc_banners',pvc_banners)
router.get('/wrapping_paper',wrapping_paper);
router.get('/free_sample_pack',free_sample_pack)
router.get('/christmas_products',christmas_products)

// seeded paper menu
const blank_paper = require('../website_functions/seeded_paper/blank_paper');
const business_cards = require('../website_functions/seeded_paper/business_cards');
const flyer_and_invites = require('../website_functions/seeded_paper/flyer_and_invites');
const greetings_cards = require('../website_functions/seeded_paper/greetings_cards');
const seeded_paper = require('../website_functions/seeded_paper/seeded_paper')
router.get('/blank_paper', blank_paper)
router.get('/business_cards', business_cards);
router.get('/flyer_and_invites', flyer_and_invites);
router.get('/greetings_cards', greetings_cards)
router.get('/seeded_paper',seeded_paper)


// about menu
const about = require('../website_functions/about/about')
const blogs = require('../website_functions/about/blogs')
const business_services = require('../website_functions/about/business_services')
const design_services = require('../website_functions/about/design_services');
const how_it_works = require('../website_functions/about/how_it_works');
const meet_the_paper = require('../website_functions/about/meet_the_paper');
const we_are_green = require('../website_functions/about/we_are_green');
const why_pandora_prints = require('../website_functions/about/why_pandora_prints');

router.get('/about', about)
router.get('/blogs', blogs);
router.get('/business_services', business_services);
router.get('/design_services', design_services);
router.get('/how_it_works', how_it_works);
router.get('/meet_the_paper', meet_the_paper);
router.get('/we_are_green', we_are_green);
router.get('/why_pandora_prints', why_pandora_prints)


// help menu
const faq = require('../website_functions/help/faq')
const product_template_guides = require('../website_functions/help/product_template_guides')
const terms_and_conditions = require('../website_functions/help/terms_and_conditions');
const privacy_policy = require('../website_functions/help/privacy_policy');
const what_is_low_res = require('../website_functions/help/what_is_low_res')
const contact = require('../website_functions/help/contact')

router.get('/faq', faq)
router.get('/product_template_guides', product_template_guides)
router.get('/terms_and_conditions', terms_and_conditions)
router.get('/privacy_policy', privacy_policy)
router.get('/what_is_low_res', what_is_low_res)
router.get('/contact', contact)

module.exports = router;