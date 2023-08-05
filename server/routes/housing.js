const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: './images/residences' });
const { isAuthenticated } = require('../middleware/auth_middleware');
const housing_controller = require('../controllers/housing_controller');

router.get('/', isAuthenticated, housing_controller.getUserHousing);

router.get('/:residence', isAuthenticated, housing_controller.getResidence);

// router.post('/', isAuthenticated, upload.single('image'), housing_controller.addResidence);
router.post('/', isAuthenticated, upload.single('image'), (req, res) => {
    console.log(req.body)
    res.status(200).send('yr');
});


router.put('/:residence', isAuthenticated, upload.single('image'), housing_controller.updateResidence);

module.exports = router;
