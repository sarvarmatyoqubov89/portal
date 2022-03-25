const Router = require('express');
const router = new Router();
const asyncHandler = require('express-async-handler');
const Portal = require('../../models/portalModels');
const { portalSchema } = require('./schema');

const getPortals = asyncHandler(async (req, res) => {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1

    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i',
        },
    }
    : {}

    const count = await Portal.countDocuments({ ...keyword })
    const portals = await Portal.find({ ...keyword })
        .limit(pageSize)
        .skip(pageSize * (page - 1 ))

    res.json({ portals, page, pages: Math.ceil(count / pageSize) })
});

const getPortalById = asyncHandler( async (req, res) => {
    const portal = await Portal.findById(req.params.id)

    if (portal) {
        res.json(portal)
    } else {
        res.status(404).send({msg:'Portal topilmadi'})
    }
});

const deletePortal = asyncHandler( async (req, res) => {
    const portal = await Portal.findById(req.params.id)

    if (portal) {
        await portal.remove()
        res.json({ msg: "Portal o'chirildi"})
    } else {
        res.status(404).send({msg:'Portal topilmadi'})
    }
});

const createPortal = asyncHandler( async (req, res) => {
    
    const { error } = portalSchema(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    try {
        const portal = await Portal.create({
            user: req.body.user, kirish: req.body.kirish, portal_raqami: req.body.portal_raqami, kelib_tushgan_sana: req.body.kelib_tushgan_sana, 
            ijro_muddati: req.body.ijro_muddati, fio: req.body.fio, tumanlar: req.body.tumanlar,
            tizimlar: req.body.tizimlar, ijro_etilgan_sana: req.body.ijro_etilgan_sana, qanoatlantirilgan: req.body.qanoatlantirilgan,
            tushuntirilgan: req.body.tushuntirilgan, rad_etilgan: req.body.rad_etilgan, izoh: req.body.izoh
        });
        return res.status(200).json(portal);
    } catch (error) {
        return res.status(500).send(error.message)
    }    
});

const updatePortal = asyncHandler( async(req, res) => {
    const { error, value } = portalSchema(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    try {
        const portal = await Portal.findById(req.params.id);
        const updatePortal = await portal.save()
        return res.status(200).json(updatePortal)
    } catch (error) {
        return res.status(500).send(error.message)
    }
});


router.get('/', getPortals);
router.get('/:id', getPortalById);
router.post('/', createPortal);
router.put('/:id', updatePortal);
router.delete('/:id', deletePortal);

module.exports = router;